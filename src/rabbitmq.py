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

#seed(1)
r1 = random.randint(0, 10)

# Connect to rabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Send message
def send(num):
	# threading.Timer(2.0, send).start()
	connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
	channel = connection.channel()
	# print("Sending")
	r2 = random.randint(0, 10)
	channel.queue_declare(queue='hello')
	channel.basic_publish(exchange='',
		routing_key='hello',
		body= str(num))
	print("Sent")
	connection.close()

# send()
@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def hello_world():
	if (request.method == 'POST'):
		print(request.form)
		jsonData = request.get_json()
		print(jsonData["Age"])
		send(int(jsonData["Age"]))
	return "ok"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3050)

# connection.close()

