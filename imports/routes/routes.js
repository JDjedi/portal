import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom'; // react router syntax below v4! 
import { createBrowserHistory } from 'history';

import Signup from '../ui/Signup';
import Userlink from '../ui/Userlink';
import Notfound from '../ui/NotFound';
import Login from '../ui/Login';

const history = createBrowserHistory();
const unAuthenticatedPages = ['/signup', '/login', '*', '/Userlink'];
const authenticatedPages = ['/userlink']


const onEnterPublicPage = (Component) => {
    if (Meteor.userId()) {
        return <Redirect to="/userlink" />
    } else {
        return <Component />
    }
}

const onEnterPrivatePage = (Component) => {
    if (!Meteor.userId()) {
        return <Redirect to="/login" />
    } else {
        return <Component />
    }
}

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unAuthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated) {
        history.push('/userlink')
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.push('/login')
    }
}

export const routes = ( 
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Userlink} render={() => onEnterPublicPage(Login)} />
            <Route exact path="/signup" component={Signup} render={() => onEnterPublicPage(Signup)} />
            <Route exact path="/login" component={Login} render={() =>  onEnterPrivatePage(Userlink)} />
            <Route exact path="*" component={Notfound} />
        </Switch>
    </Router>
);




