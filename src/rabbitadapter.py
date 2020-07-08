#!/usr/bin/env python
# rec.py starts a python webserver that recieves rabbitmq requests and also
# exposes them to a proemtheus endpoint that can be scraped

import pika
import _thread
from flask import Flask
from prometheus_client import start_http_server, Summary
import random
import time
from prometheus_client import Counter
from prometheus_client import Gauge

# create new prometheus counter and gauge 
c = Counter('my_failures', 'Description of counter')
g = Gauge('decimal_aggregate', 'Aggregator')


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


channel.basic_consume(
    queue='hello', on_message_callback=callback, auto_ack=True)


if __name__ == '__main__':
    # Start up the server to expose the metrics.
    start_http_server(8000)
    channel.start_consuming()
    print("Server Start")



