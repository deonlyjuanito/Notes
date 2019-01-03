import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import NoteListItem from './NoteListItem';
import '../util/EnzmeConfigure';

if (Meteor.isClient) {
    describe('NoteListItem', function() {
        it('should render title and timestamp', function() {
            const title = 'My title here';
            const updateAt = 1546482042212; // require('moment')().valueOf();
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <NoteListItem note={{ title, updateAt }} />
                </MemoryRouter>
            );

            expect(wrapper.find('h5').text()).to.equal(title);
            expect(wrapper.find('p').text()).to.equal('1/02/19');
        });

        it('should set default title if no title set', function() {
            const title = '';
            const updateAt = 1546482042212; // require('moment')().valueOf();
            const wrapper = mount(
                <MemoryRouter initialEntries={['/signup']} initialIndex={0}>
                    <NoteListItem note={{ title, updateAt }} />
                </MemoryRouter>
            );
            expect(wrapper.find('h5').text()).to.equal('Untitled note');
            expect(wrapper.find('p').text()).to.equal('1/02/19');
        });
    });
}
