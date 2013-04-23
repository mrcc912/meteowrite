#!/usr/bin/python
import re
import pymongo
from pymongo import MongoClient
from xml.dom import minidom
from os import listdir

def main():
  connection = MongoClient()
  db = connection.raw
  xmlFile = "/home/ubuntu/meteowrite/xmlFiles/"
  
  for f in listdir(xmlFile):
      
    xmldoc = minidom.parse(xmlFile + f)
    tokenlist = xmldoc.getElementsByTagName('token')
    m = re.match(r".*/(\d+)\.xml", xmlFile + f)
    curId = m.group(1)
    dictList = list()
    for token in tokenlist: 
      word = token.getElementsByTagName('word')[0].childNodes[0].data
      ner = token.getElementsByTagName('NER')[0].childNodes[0].data
      
      if ner != "DATE" and  ner != "O":
        newDict = {}
        newDict['text'] = word
        newDict['relevance'] = 0.2
        newDict['ner'] = ner
        dictList.append(newDict)    
    updateIt(curId, dictList,db)

def updateIt(theId, theList,db):
  found = db.articles.find_one({'id' : int(theId)})
  found["keywordsCore"] = theList 
  db.articles.save(found)
  

main()
