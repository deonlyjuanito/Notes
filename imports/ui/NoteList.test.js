import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { NoteList } from './NotesList';
import '../util/EnzmeConfigure';

const notes = [
    {
        _id: 'noteId1',
        title: 'Test title',
        body: '',
        updateAt: 0,
        userId: 'userId1'
    },
    {
        _id: 'noteId2',
        title: '',
        body: 'Something is here',
        updateAt: 0,
        userId: 'userId2'
    }
];

if (Meteor.isClient) {
    describe('NoteList', function() {
        it('should render NoteListItem for each note', function() {
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <NoteList notes={notes} />
                </MemoryRouter>
            );
            expect(wrapper.find('NoteListItem').length).equal(2);
            expect(wrapper.find('NoteListEmptyItem').length).equal(0);
        });

        it('should render NoteListEmptyItem if zero notes', function() {
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <NoteList notes={[]} />
                </MemoryRouter>
            );
            expect(wrapper.find('NoteListItem').length).equal(0);
            expect(wrapper.find('NoteListEmptyItem').length).equal(1);
        });
    });
}
