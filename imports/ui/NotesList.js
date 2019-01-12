import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../api/notes';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = props => {
    let displayNotes = props.notes.map(note => {
        return (
            <div key={note._id}>
                <NoteListItem note={note} />
            </div>
        );
    });
    return (
        <div className='item-list'>
            <NoteListHeader />
            {props.notes.length > 0 ? displayNotes : <NoteListEmptyItem />}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
};

export default withTracker(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    Meteor.subscribe('notesToSubscribe');
    return {
        notes: Notes.find({}, { sort: { updateAt: -1 } })
            .fetch()
            .map(note => {
                return {
                    ...note,
                    selected: note._id === selectedNoteId
                };
            })
    };
})(NoteList);
