#!/usr/bin/env python
"""https://gist.github.com/aallan/9416763d42534ae99f6f0228f54160c9?permalink_comment_id=3998894#gistcomment-3998894"""
try:
    from http import server # Python 3
except ImportError:
    import SimpleHTTPServer as server # Python 2

class MyHTTPRequestHandler(server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_my_headers()
        server.SimpleHTTPRequestHandler.end_headers(self)

    def send_my_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")

if __name__ == '__main__':
    server.test(HandlerClass=MyHTTPRequestHandler)
