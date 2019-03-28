import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // react router syntax below v4! 
import createBrowserHistory from 'history/createBrowserHistory';

import Signup from './../imports/ui/Signup';
import Userlink from './../imports/ui/Userlink';
import Notfound from './../imports/ui/NotFound';
import Login from './../imports/ui/Login';

const history = createBrowserHistory();
const routes = (			
	<Router history={history}>
		<Switch>
			<Route exact path="/" component={Userlink} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/login" component={Login} />
			<Route exact path="*" component={Notfound} />
		</Switch>
	</Router>
)

Meteor.startup(() => {
	ReactDOM.render(routes, document.getElementById('app'));
});


