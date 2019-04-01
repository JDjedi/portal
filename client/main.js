import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom'; // react router syntax below v4! 
import { createBrowserHistory } from 'history';
import { Tracker } from 'meteor/tracker';

import Signup from './../imports/ui/Signup';
import Userlink from './../imports/ui/Userlink';
import Notfound from './../imports/ui/NotFound';
import Login from './../imports/ui/Login';

const history = createBrowserHistory();
const unAuthenticatedPages = ['/signup', '/login', '*', '/Userlink'];
const authenticatedPages = ['/userlink']

const routes = (	
	<Router history={history}>
		<Switch>

			<Route exact path="/userlink" component={Userlink} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/login" component={Login} />
			<Route exact path="*" component={Notfound} />
		</Switch>
	</Router>
);

// track status of what you want it to track and acts or reacts on it
Tracker.autorun(() => { 
	// !! takes a falsy or truthy value and makes it a real true or false, boolean
	const isAuthenticated = !!Meteor.userId(); 
	const pathname = history.location.pathname;
	const isUnauthenticatedPage = unAuthenticatedPages.includes(pathname);
	const isAuthenticatedPage = authenticatedPages.includes(pathname);

	if (isUnauthenticatedPage && isAuthenticated) {
		history.push('/userlink')
	} else if (isAuthenticatedPage && !isAuthenticated) {
		history.push('/login')
	}
})

Meteor.startup(() => {
	ReactDOM.render(routes, document.getElementById('app'));
});


