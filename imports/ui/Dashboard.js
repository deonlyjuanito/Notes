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
                        <div className='page-content__sidebar'>
                            <NoteList />
                        </div>
                        <div className='page-content__main'>
                            <Editor />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
