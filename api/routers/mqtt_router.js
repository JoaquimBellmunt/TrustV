module.exports = function(sails) {
    
    var plusRegEx = '[^/]*';
    var hashRegEx = '.*';

    return function route (topic, message) {
	//  sails.log.verbose("Routing on topic '" + topic + "' received message: " + message);

	var routing = sails.config.mqttRoutes;
	var routes = Object.keys(routing);

	function isMatching(pattern) {
	    var regEx = new RegExp(pattern.replace(/\/#/g, hashRegEx).replace(/\+/g, plusRegEx), 'g');
	    return topic.match(regEx);
	}
	
	var match = routes.filter(isMatching);
	if(match.length > 0) {
	    var controllerID = routing[match[0]].split('.')[0];
	    var method = routing[match[0]].split('.')[1];
	    sails.controllers[controllerID.toLowerCase().slice(0,-'controller'.length)][method](message, topic);
	} else {
	    // log.warn("No route found for MQTT topic '"+topic+"'");
	}
    };
    
};