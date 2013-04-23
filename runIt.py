#!/usr/bin/python
import pickle
import pymongo
from pymongo import MongoClient

def main():
  connection = MongoClient()
  db = connection.raw
  bla = list(db.articles.find())
  theDict = {}
  f = open('textDict.pickle', 'w')
  for b in bla:
    curId = b['id']
    curT = b['body']
    theDict[curId] = curT
    
  pickle.dump(theDict, f)
  f.close()

main()
