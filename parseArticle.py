#!/usr/bin/python
import json
import pymongo
from pymongo import MongoClient
import sys
import urllib,httplib
import urllib2
from HTMLParser import HTMLParser

def parseCSVFile(fileName):
  connection = MongoClient()
  db = connection.raw
  article = db.articles 
  f = open(fileName, "r")
  buff = f.readline()
  buff = f.readline()
  index = 0
  
  while buff != "": 
    index = index + 1
    sep = buff.split(',', 7)
    print len(sep)
    if len(sep) == 8:
      articleId = int(sep[0])
      headline = sep[1] 
      biline = sep[2]
      creditline = sep[3]
      source = sep[4]
      section = sep[5]
      URL = sep[6]
      body = strip_tags(sep[7])

      keywords = makeAlchemyConnection(body)
      newArticle = {"id":articleId, "headline":headline, "biline":biline, "creditline":creditline, "source":source, "section":section, "URL":URL, "body":body, "keywords":keywords}
      articleId = article.insert(newArticle)
  f.close()


class MLStripper(HTMLParser):
    def __init__(self):
        self.reset()
        self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return ''.join(self.fed)

def strip_tags(html):
  s = MLStripper()
  s.feed(html)
  return s.get_data()

def makeAlchemyConnection(text):
  method = 'POST'
  apiKey = "3e8f9346f19fae52967b9586d4fd3808bc6d8b4e"
  uri = 'http://access.alchemyapi.com/calls/text/TextGetRankedKeywords'
  body = 'apikey=' + apiKey + '&text='+ urllib.quote(text,'') + '&outputMode=json'
  data = urllib2.urlopen(uri + "?" + body).read()
  data = json.loads(data)
  keywords = data[u'keywords']
  for tup in keywords:
    tup[u'relevance'] = float(tup[u'relevance']) 
  return keywords
parseCSVFile("sacbee_pubsys_stories.csv")      
