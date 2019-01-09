import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
// import { routes, onAuthChange } from '../imports/routes/routes.js';
import { AppRouter } from '../imports/routes/routes.js';
import './main.html';
import { Session } from 'meteor/session';
import history from '../imports/util/History';

// Tracker.autorun(() => {
//     const isAuthenticated = !!Meteor.userId();
//     onAuthChange(isAuthenticated);
// });

Tracker.autorun(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    if (selectedNoteId) {
        history.replace(`/dashboard/${selectedNoteId}`);
    }
});
Meteor.startup(() => {
    Session.set('selectedNoteId', undefined);
    ReactDOM.render(<AppRouter />, document.getElementById('app'));
});
