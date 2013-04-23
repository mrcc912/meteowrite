#!/usr/bin/python
import os
import subprocess
from xml.dom import minidom
import pickle

def main():
  f = open("textDict.pickle", 'r')
  curDict = pickle.load(f)
  f.close()
  
  homeDir = "theArticleFiles/"
  
  for key in curDict.keys():
    curT = curDict[key]
  
    f = open(homeDir + str(key) + ".xml", "w")
    f.write(curT) 
    f.close()
    nlpRun(homeDir + str(key) + ".xml")

def nlpRun(theFile):
  filePath = "stanford-corenlp-full-2012-11-12/"
  wholeThing = filePath + 'stanford-corenlp-1.3.4.jar:' + filePath + 'stanford-corenlp-1.3.4-models.jar:' + filePath + 'xom.jar:' + filePath + 'joda-time.jar:' + filePath + 'jollyday.jar' 
  subprocess.check_output(['java', '-cp', wholeThing, '-Xmx3g', 'edu.stanford.nlp.pipeline.StanfordCoreNLP','-annotators', 'tokenize,ssplit,pos,lemma,ner', '-file', theFile])

main()
