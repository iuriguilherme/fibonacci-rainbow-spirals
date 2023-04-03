#!/usr/bin/env python3
"""This python script generates a javascript dictionary with the \
fibonacci sequence, index as keys and fibonacci numbers as values."""

import json
import os
import sys

out_file: str = os.path.join("project", "src", "fibonacci.js")

try:
    limit: str = sys.argv[1]
except:
    limit: str = 3600
    print(f"Usage: `{sys.argv[0]} [LIMIT]`. Using {limit} as default.")

try:
    import sympy
except Exception as e:
    sys.exit(f"Try `pip install sympy` or similar. {repr(e)}")

d: dict[str, str] = {
    str(n): str(sympy.fibonacci(n)) \
    for n in range(limit + 1)
}

import json

with open(out_file, 'w') as f:
    f.write(f"export var fibonacci_index = {json.dumps(d)}")
