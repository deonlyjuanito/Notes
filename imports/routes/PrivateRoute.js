import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to='/' />)} />
);

export default withTracker(() => {
    return {
        isAuthenticated: !!Meteor.userId()
    };
})(PrivateRoute);

// export default withTracker(() => ({ isAuthenticated: !!Meteor.userId() }))(PrivateRoute);
