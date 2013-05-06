#!/bin/bash

declare -a joined

joined=($(./executed.py $1))
echo ${joined[@]}
