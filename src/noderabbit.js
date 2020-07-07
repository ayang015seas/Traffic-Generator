var amqp = require('amqplib/callback_api');
const express = require('express')
const app = express()
const port = 5000
var bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors());

function rabbit(message) {
  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = 'hello';
      var msg = message;

      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
  });
}

app.get('/', function (req, res) {
  rabbit(24)
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  console.log(req.body);
  rabbit(req.body.Age)
  res.sendStatus(200);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

