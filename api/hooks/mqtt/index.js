// var keepalive = require('../../controllers/KeepaliveController');
// var changetracker = require('../../controllers/ChangeTrackerNotificationController');

module.exports = function(sails) {
        /**
     * Module dependencies
     */
    var mqtt = require('mqtt'),
    // ubi = require('ubiutils'),
    route = require('../../routers/mqtt_router')(sails);

    // var log = ubi.log('mqtt_hook');


    return {

	initialize: function(cb) {
	    if(true) {
			console.log('Enabling MQTT Server.');
			var client = mqtt.connect({
			    protocolId: 'MQIsdp',
			    protocolVersion: 3,
			    servers: [{
				host: 'localhost',
				port: 1883
			    }]
			});

		// utility wrapping of publish method (defaults override)
			var publish = function(topic, message, options) {
			    if(!options) options = {};
			    client.publish(topic, message, {
				qos: options.qos || 1,
				retain: options.retain || true
			    });
			};

			client.on('message', function (topic, message) {
				console.log(topic)
				console.log(JSON.parse(message))
			});

		// subscribe to all topics with QoS 1
			client.on('connect', function () {
			    console.log('MQTT client connected, subscribing to all topics...');
			    client.subscribe({'#': 1});
			});

			sails.emit('hook:mqtt:ready');
	    }
	    cb();
	}

    };
};
