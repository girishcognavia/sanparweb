"""Simple HTTP server for SANPAR redesigned website."""
import http.server
import os
import sys
import functools

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=DIRECTORY)
    with http.server.HTTPServer(("0.0.0.0", PORT), handler) as httpd:
        print(f"\n  SANPAR Redesigned Website", flush=True)
        print(f"  Serving at: http://localhost:{PORT}", flush=True)
        print(f"  Directory:  {DIRECTORY}", flush=True)
        print(f"  Press Ctrl+C to stop\n", flush=True)
        sys.stdout.flush()
        httpd.serve_forever()
