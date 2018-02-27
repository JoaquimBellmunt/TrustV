'use strict'


var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://52.221.227.104:1883')

//var client  = mqtt.connect([{ host: '52.221.227.104', port: 1883 }])
 
client.on("connect", function() {
  console.log("cleint is connected");
})

/*** client on reconnect ***/
client.on("reconnect", function() {
  console.log("cleint is reconnected");
})

/*** client on error ***/
client.on("error", function(err) {
  console.log("error from client --> ", err);
})

/*** client on close ***/
client.on("close", function() {
    console.log("cleint is closed");
  })
  /*** client on offline ***/
client.on("offline", function(err) {
  console.log("client is offline");
});

client.subscribe('topic/client', { qos: 1 }, function(err, granted) {
  if (err)
    console.log(err);
  else
    console.log("client connected : ", granted);
});

client.publish('topic/client', JSON.stringify({ name: "TrustVector", title: "Demo" }), { retain: true, qos: 1 });

client.on('message', function(topic, message) {
  console.log(message.toString()); // message is Buffer
  //console.log(message);
  client.end();
});