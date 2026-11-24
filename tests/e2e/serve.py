"""Static server for the browser tests.

`python -m http.server` keeps a listen queue of 5 and opens a new connection per request (HTTP/1.0).
The page loads about 30 modules at once, and the browser tests saw ERR_CONNECTION_RESET on module
requests. This server keeps a longer queue and reuses connections.
"""
import functools
import http.server
import sys


class Server(http.server.ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True


class Handler(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    port, root = int(sys.argv[1]), sys.argv[2]
    with Server(("127.0.0.1", port), functools.partial(Handler, directory=root)) as s:
        s.serve_forever()
