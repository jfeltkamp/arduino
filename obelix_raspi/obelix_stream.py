#!/usr/bin/python3

# Mostly copied from https://picamera.readthedocs.io/en/release-1.13/recipes2.html
# Run this script, then point a web browser at http:<this-ip-address>:8000
# Note: needs simplejpeg to be installed (pip3 install simplejpeg).

import io
import logging
import socketserver
import threading
from http import server
from threading import Condition
from picamera2.encoders import JpegEncoder
from picamera2.outputs import FileOutput

class StreamingOutput(io.BufferedIOBase):
    def __init__(self):
        self.frame = None
        self.condition = Condition()

    def write(self, buf):
        with self.condition:
            self.frame = buf
            self.condition.notify_all()

output_a = StreamingOutput()
output_b = StreamingOutput()

class StreamingHandler(server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/stream_a.mjpg':
            self.send_response(200)
            self.send_header('Age', 0)
            self.send_header('Cache-Control', 'no-cache, private')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=FRAME')
            self.end_headers()
            try:
                while True:
                    with output_a.condition:
                        output_a.condition.wait()
                        frame = output_a.frame
                    self.wfile.write(b'--FRAME\r\n')
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', len(frame))
                    self.end_headers()
                    self.wfile.write(frame)
                    self.wfile.write(b'\r\n')
            except Exception as e:
                logging.warning(
                    'Removed streaming client %s: %s',
                    self.client_address, str(e))
        if self.path == '/stream_b.mjpg':
            self.send_response(200)
            self.send_header('Age', 0)
            self.send_header('Cache-Control', 'no-cache, private')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=FRAME')
            self.end_headers()
            try:
                while True:
                    with output_b.condition:
                        output_b.condition.wait()
                        frame = output_b.frame
                    self.wfile.write(b'--FRAME\r\n')
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', len(frame))
                    self.end_headers()
                    self.wfile.write(frame)
                    self.wfile.write(b'\r\n')
            except Exception as e:
                logging.warning(
                    'Removed streaming client %s: %s',
                    self.client_address, str(e))
        else:
            self.send_error(404)
            self.end_headers()


class StreamingServer(socketserver.ThreadingMixIn, server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True

class ObelixStream:
    def __init__(self, picam2_a, picam2_b):
        self.picam2_a = picam2_a
        self.config_a = picam2_a.create_video_configuration(main={"size": (1080, 810)})
        self.picam2_b = picam2_b
        self.config_b = picam2_b.create_video_configuration(main={"size": (1080, 810)})
        self.serv_listener = None

    def start(self):
        self.serv_listener = threading.Thread(target=self.start_server)
        self.serv_listener.start()

    def start_server(self):
        self.picam2_a.configure(self.config_a)
        self.picam2_a.start_recording(JpegEncoder(), FileOutput(output_a))
        self.picam2_b.configure(self.config_b)
        self.picam2_b.start_recording(JpegEncoder(), FileOutput(output_b))
        try:
            print('Server starts')
            address = ('', 7777)
            server = StreamingServer(address, StreamingHandler)
            server.serve_forever()
            print('Server loop running')
        except:
            pass

    def stop(self):
        self.picam2_a.stop_recording()
        self.picam2_b.stop_recording()
