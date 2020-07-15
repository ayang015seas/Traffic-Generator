# send.py sends a message to a RabbitMQ server
# In our case, we generate a random number and send it each time

import pika
#from random import seed
import random
import threading
from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Connect to rabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Send message
def send(num):
	connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
	channel = connection.channel()
	channel.queue_declare(queue='hello')
	channel.basic_publish(exchange='',
		routing_key='hello',
		body= str(num))
	print("Sent")
	connection.close()

# Setup flask route to receive post requests 
@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def main():
	if (request.method == 'POST'):
		print(request.form)
		jsonData = request.get_json()
		print(jsonData["Number"])
		send(int(jsonData["Number"]))
	return "ok"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3050)


