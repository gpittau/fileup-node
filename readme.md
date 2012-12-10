###fileup-node    
File upload helper for nodejs/express

###app.js
````
	var express = require('express'), app = express();
	var server = require('http').createServer(app)
 	server.listen(85);
	console.log('listening on 85');

 	var fileup = require('./fileup-node.js')(express, app, './files', function(r,s,f){
		 // after upload
		 s.end('saved file as ' + f.filename);
	});
	
	// comment this for no logging
	fileup.log = console.log;
	
 	app.get('/', function(r,s){
 		s.send('example is at /upl')
 	})
````