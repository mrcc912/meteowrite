#!/usr/bin/python
import sys
import re
from xml.dom import minidom
from os import listdir
import json
import pymongo
from pymongo import MongoClient
import sys
import urllib,httplib
import urllib2
from HTMLParser import HTMLParser
from calais import Calais


def main():
  if len(sys.argv) < 9:
    raise Exception('Incorrect number of parameters')


  connection = MongoClient()
  db = connection.raw
  article = db.articles

  articleId = urllib.unquote(sys.argv[1])
  headline = urllib.unquote(sys.argv[2])
  biline = urllib.unquote(sys.argv[3])
  creditline = urllib.unquote(sys.argv[4])
  source = urllib.unquote(sys.argv[5])
  section = urllib.unquote(sys.argv[6])
  url = urllib.unquote(sys.argv[7])
  body = urllib.unquote(sys.argv[8])

  keywords = makeAlchemyConnection(body)
  keywordsCalais = makeOCConnection(body)
  newArticle = {"id":articleId, "headline":headline, "biline":biline, "creditline":creditline, "source":source, "section":section, "URL":URL, "body":body, "keywords":keywords, "keywordsCalais": keywordsCalais}
  articleId = article.insert(newArticle)

  #print 'id: ', curId, '\n'
  #print 'headline: ', headline, '\n'
  #print 'biline: ', biline, '\n'
  #print 'creditline: ', creditline, '\n'
  #print 'source: ', source, '\n'
  #print 'section: ', section, '\n'
  #print 'url: ', url, '\n'
  #print 'body: ', body, '\n'


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
  
def makeOCConnection(text):
  apiKey = "mn9qgy5fzn96qy9s65n9weda"
  calais = Calais(apiKey, submitter="python-calais demo")
  result = calais.analyze(text)
  retList = []
  for ent in result.entities:
    newMap = {}
    newMap["text"] = ent["name"]
    newMap["relevance"] = ent["relevance"]
    retList.append(newMap)
  return retList

main()