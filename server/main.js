import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';


import '../imports/api/users';
import '../imports/api/links';
import '../imports/startup/simple-schema-config.js';


Meteor.startup(() => {  // code to run on server at startup
	// WebApp.connectHandlers.use((req, res, next) => {
	// 	console.log('My custom middleware!');
	// 	console.log(req.url, req.method, req.headers, req.query);
	// 	next(); // allows the server to process the request and complete the process
	// })
});

// *** pattern ***
// req comes in
// run our middleware one at a time
// send them that page
