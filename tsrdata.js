var 	fs = require('fs'),
    	StompClient = require('stomp-client').StompClient,
	secure = require('./secure.js');
	
	
var topic = 'TSR_WEST_ROUTE';
var datafeed = 'datafeeds.networkrail.co.uk';
var destination = '/topic/' + topic;

// Define feed security
var username = secure.username;
var password = secure.password;

// Define SQL connection

//var connection = mysql.createConnection({
//	host		: secure.database_host,
//	user		: secure.database_user,
//	password	: secure.database_password,
//	database	: secure.database_name,
//});


client = new StompClient(datafeed, 61618, username, password, '1.0');

client.connect(function(sessionId) {
    console.log('Trying to connect...');

	// Subscribe and collect message
    client.subscribe(destination, function(body, headers) {
        fs.writeFile("/home/ec2-user/datadisplay/data/tsr.json", body, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("The file was saved!");
				client.disconnect(function() {
					console.log('Disconnected');
				});
			}
		}); 
    });
	// end subscription	
});

