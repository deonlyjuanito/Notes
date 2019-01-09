import PrivateHeader from '../ui/PrivateHeader';
import NoteList from './NotesList';
import { Session } from 'meteor/session';
import React, { Component } from 'react';
import Editor from './Editor';

class Dashboard extends Component {
    componentDidMount() {
        if (this.props.match) {
            Session.set('selectedNoteId', this.props.match.params.id);
        }
    }

    render() {
        return (
            <div>
                <div>
                    <PrivateHeader title='Dashboard' />
                    <div className='page-content'>
                        <NoteList />
                        <Editor />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
