import http.server
import socketserver
from sys import argv

# Define the port number to run the server on
PORT = int(argv[1]) if len(argv) > 1 else 8000

# Set up the HTTP request handler
Handler = http.server.SimpleHTTPRequestHandler

# Create a socket server with the specified port and request handler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Server running at http://localhost:{}".format(PORT))
    httpd.serve_forever()

