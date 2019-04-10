import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from '../imports/routes/routes'
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-config.js';

// track status of what you want it to track and acts or reacts on it
Tracker.autorun(() => { 
	const isAuthenticated = !!Meteor.userId();  // !! takes a falsy or truthy value and makes it a real true or false, boolean
	onAuthChange(isAuthenticated)
})

Meteor.startup(() => {
	// Meteor.call('addNumbers', 2, 4, (err, res) => {
	// 	console.log("addNumbers function firing", err, res);
	// });

	// Meteor.call('addNumbers', "two piece tuesdays", 4, (err, res) => {
	// 	console.log("addNumbers function firing", err, res);
	// });
	Session.set('showVisible', true); // Session is initiated and created here!
	
	ReactDOM.render(routes, document.getElementById('app'));
});



