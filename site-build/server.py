"""SPA HTTP server for SANPAR redesigned website.
Serves spa.html for all routes that don't match a static file."""
import http.server
import os
import sys

PORT = 8090
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    STATIC_PREFIXES = ('/css/', '/js/', '/images/', '/pages/')
    STATIC_FILES = ('spa.html', 'favicon.ico', 'robots.txt')

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        path = self.path.split('?')[0].split('#')[0]
        clean = path.lstrip('/')

        is_static = (
            any(path.startswith(p) for p in self.STATIC_PREFIXES)
            or clean in self.STATIC_FILES
        )
        if is_static:
            return super().do_GET()

        self.path = '/index.html'
        return super().do_GET()


if __name__ == "__main__":
    os.chdir(DIRECTORY)
    with http.server.HTTPServer(("127.0.0.1", PORT), SPAHandler) as httpd:
        print(f"\n  SANPAR SPA Website", flush=True)
        print(f"  Serving at: http://localhost:{PORT}", flush=True)
        print(f"  Directory:  {DIRECTORY}", flush=True)
        print(f"  Press Ctrl+C to stop\n", flush=True)
        sys.stdout.flush()
        httpd.serve_forever()
