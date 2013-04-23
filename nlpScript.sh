#!/bin/bash
foo="stanford-corenlp-full-2012-11-12/"
java -cp ${foo}stanford-corenlp-1.3.4.jar:${foo}stanford-corenlp-1.3.4-models.jar:${foo}xom.jar:${foo}joda-time.jar:${foo}jollyday.jar -Xmx3g edu.stanford.nlp.pipeline.StanfordCoreNLP -annotators tokenize,ssplit -file $1
