#!/usr/bin/env python
# rec.py starts a python webserver that recieves rabbitmq requests and also
# exposes them to a proemtheus endpoint that can be scraped

import pika
import _thread
import threading
from flask import Flask
from prometheus_client import start_http_server, Summary
import random
import time
from prometheus_client import Counter
from prometheus_client import Gauge
from flask import request

# create new prometheus counter and gauge 
c = Counter('my_failures', 'Description of counter')
g = Gauge('decimal_aggregate', 'Aggregator')

# new endpoints
d1 = Gauge('python_http', 'python_http')
d2 = Gauge('python_rabbit', 'python_rabbit')
d1.set(10)
d2.set(10)

app = Flask(__name__)


# connect to rabbitMQ server 
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='hello')

# test variable for prometheus
rabbits = 0.0

# increment counters upon receiving the message
def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    decimal = float(body)
    global rabbits
    rabbits = decimal
    c.inc()
    g.set(rabbits)
    d2.set(rabbits)


channel.basic_consume(
    queue='hello', on_message_callback=callback, auto_ack=True)

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def main():
    if request.method == 'POST':
        print("REQUEST: ")
        content = request.json
        d1.set(int(content['Number']))
    return "Check"

if __name__ == '__main__':
    threading.Thread(target=app.run).start()
    print("Starting Metrics Server")
    # Start up the server to expose the metrics.
    start_http_server(8000)
    channel.start_consuming()
    print("Server Start")





