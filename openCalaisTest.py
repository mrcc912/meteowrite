#!/usr/bin/python

import json
import sys
import urllib,httplib
import urllib2
from HTMLParser import HTMLParser
from calais import Calais

def getOpenCalais():
  f = open("justOne.csv", "r")
  buff = f.readline()
  sep = buff.split(',', 7)
  articleId = int(sep[0])
  headline = sep[1]
  biline = sep[2]
  creditline = sep[3]
  source = sep[4]
  section = sep[5]
  URL = sep[6]
  body = strip_tags(sep[7]) 
  resp = makeOCConnection(body)
  for bla in resp.entities: 
    print bla


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

def makeOCConnection(text):
  apiKey = "mn9qgy5fzn96qy9s65n9weda"
  calais = Calais(apiKey, submitter="python-calais demo")
  result = calais.analyze(text)
  
  return result 

getOpenCalais()
