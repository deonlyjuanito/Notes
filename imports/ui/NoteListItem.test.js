import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { NoteListItem } from './NoteListItem';
import { notes } from '../fixtures/fixtures';
import { spy } from 'sinon';
import '../util/EnzmeConfigure';

if (Meteor.isClient) {
    describe('NoteListItem', function() {
        let Session;

        beforeEach(() => {
            Session = {
                set: spy()
            };
        });

        it('should render title and timestamp', function() {
            // const updateAt = 1546482042212; // require('moment')().valueOf();
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <NoteListItem note={notes[0]} Session={Session} />
                </MemoryRouter>
            );

            expect(wrapper.find('h5').text()).to.equal(notes[0].title);
            expect(wrapper.find('p').text()).to.equal('1/02/19');
        });

        it('should set default title if no title set', function() {
            // const updateAt = 1546482042212; // require('moment')().valueOf();
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <NoteListItem note={notes[1]} Session={Session} />
                </MemoryRouter>
            );
            expect(wrapper.find('h5').text()).to.equal('Untitled note');
            expect(wrapper.find('p').text()).to.equal('1/02/19');
        });

        it('should call set on click', function() {
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <NoteListItem note={notes[0]} Session={Session} />
                </MemoryRouter>
            );
            wrapper.find('div').simulate('click');
            expect(Session.set.args[0][0]).equal('selectedNoteId');
            expect(Session.set.args[0][1]).equal(notes[0]._id);
        });
    });
}
