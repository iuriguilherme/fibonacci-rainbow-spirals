#!/bin/bash

find . -type f -not -path './.git*' -not -name '*.py' -not -name '*.sh' -exec chmod 0644 '{}' \;
find . -type f -not -path './.git*' -name '*.py' -name '*.sh' -exec chmod 0754 '{}' \;
#find . -type f -not -path './.git*' -exec dos2unix '{}' \;

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

