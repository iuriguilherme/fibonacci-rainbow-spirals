#!/bin/bash

LIST=( \
"fibonacci.js" \
"index.html" \
"index.js" \
"LICENSE.md" \
"math.js.LICENSE.txt" \
"math.js" \
"p5.min.js" \
"p5.min.js.LICENSE.txt" \
"README.md" \
"style.css" \
)
FILE="project.zip"

if [ -f "${FILE}" ]
then
    OPTIONS="0Dvu"
else
    OPTIONS="0Dv"
fi

zip -"${OPTIONS}" ${FILE} "${LIST[@]}"

