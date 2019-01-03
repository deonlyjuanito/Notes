import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { NoteListHeader } from './NoteListHeader';
import { spy } from 'sinon';
import '../util/EnzmeConfigure';

if (Meteor.isClient) {
    describe('NoteListHeader', function() {
        it('should call meteorCall on click', function() {
            const spyCallback = spy();

            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <NoteListHeader meteorCall={spyCallback} />
                </MemoryRouter>
            );
            wrapper.find('button').simulate('click');
            wrapper.find('button').simulate('click');
            expect(spyCallback.getCalls().length).equal(2);
        });
    });
}
