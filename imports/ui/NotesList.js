import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../api/notes';
import PropTypes from 'prop-types';
import NoteListHeader from './NotesListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = props => {
    let displayNotes = props.notes.map(note => {
        return (
            <div key={note._id}>
                <NoteListItem note={note} />
            </div>
        );
    });
    return (
        <div>
            <NoteListHeader />
            {displayNotes}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
};

export default withTracker(() => {
    Meteor.subscribe('notesToSubscribe');
    return {
        notes: Notes.find({}).fetch()
    };
})(NoteList);
