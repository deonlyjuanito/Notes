import React from 'react';
import PrivateHeader from '../ui/PrivateHeader';
import NoteList from './NotesList';

export default () => {
    return (
        <div>
            <PrivateHeader title='Dashboard' />
            <div className='page-content'>
                <NoteList />
            </div>
        </div>
    );
};
