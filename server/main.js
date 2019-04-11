import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';


import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-config.js';


Meteor.startup(() => {  // code to run on server at startup
	// WebApp.connectHandlers.use((req, res, next) => {
	// 	console.log('My custom middleware!');
	// 	console.log(req.url, req.method, req.headers, req.query);
	// 	next(); // allows the server to process the request and complete the process
	// })

	WebApp.connectHandlers.use((req, res, next) => {
	const _id = req.url.slice(1);
	const link = Links.findOne({ _id });

	if (link) {
	  res.statusCode = 302;
	  res.setHeader('Location', link.url);
	  res.end();
	  Meteor.call('links.trackVisit', _id);
	} else {
	  next();
	}
	});
});

// *** pattern ***
// req comes in
// run our middleware one at a time
// send them that page
