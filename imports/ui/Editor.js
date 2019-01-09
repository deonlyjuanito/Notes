import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

export class Editor extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            body: ''
        };
    }
    handleBodyChange(e) {
        const body = e.target.value;
        this.setState({ body });

        this.props.call('notes.update', this.props.note._id, {
            body
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;
        if (currentNoteId && currentNoteId !== prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            });
        }
    }

    render() {
        if (this.props.note) {
            return (
                <div>
                    <input
                        value={this.state.title}
                        placeholder='Untitled Note'
                        onChange={e => {
                            const title = e.target.value;
                            this.setState({ title });
                            this.props.call('notes.update', this.props.note._id, {
                                title
                            });
                        }}
                    />
                    <textarea value={this.state.body} placeholder='Your note here' onChange={this.handleBodyChange.bind(this)} />
                    <button
                        onClick={() => {
                            this.props.call('notes.remove', this.props.note._id);
                            Session.set('selectedNoteId', undefined);
                            if (this.props.history) {
                                this.props.history.push('/dashboard');
                            }
                        }}
                    >
                        Delete Note
                    </button>
                </div>
            );
        } else {
            return <p>{this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}</p>;
        }
    }
}
Editor.propTypes = {
    selectedNoteId: PropTypes.string,
    note: PropTypes.object,
    call: PropTypes.func.isRequired
};

export default withRouter(
    withTracker(() => {
        const selectedNoteId = Session.get('selectedNoteId');
        console.log(selectedNoteId);
        return {
            selectedNoteId,
            note: Notes.findOne(selectedNoteId),
            call: Meteor.call
        };
    })(Editor)
);
