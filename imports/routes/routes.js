import { Meteor } from 'meteor/meteor';
import React from 'react';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import Login from '../ui/Login';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import history from '../util/History';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
const onEnterPublicPage = Component => {
    if (Meteor.userId()) {
        return <Redirect to='/dashboard' />;
    } else {
        return <Component />;
    }
};

const onEnterPrivatePage = (Component, props) => {
    if (!Meteor.userId()) {
        return <Redirect to='/' />;
    } else {
        return <Component {...props} />;
    }
};

export const onAuthChange = isAuthenticated => {
    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated) {
        history.replace('/dashboard');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.replace('/');
    }
};

export const routes = (
    <Router history={history}>
        <Switch>
            <Route exact path='/' render={() => onEnterPublicPage(Login)} />
            <Route path='/signup' render={() => onEnterPublicPage(Signup)} />
            <Route exact path='/dashboard' render={props => onEnterPrivatePage(Dashboard, props)} />
            <Route path='/dashboard/:id' render={props => onEnterPrivatePage(Dashboard, props)} />
            <Route path='*' component={NotFound} />
        </Switch>
    </Router>
);
