import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';


export const NoteListHeader = props => {
    return (
        <div>
            <button onClick={() => props.meteorCall('notes.insert', (err, res) => {
                if (res) {
                    props.Session.set('selectedNoteId', res);
                }
            })}>Create Note</button>
        </div>
    );
};

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
};

// with tracker attach / wrap auto run to the compenet 
export default withTracker(() => {
    return {
        meteorCall: Meteor.call,
        Session
    };
})(NoteListHeader);
