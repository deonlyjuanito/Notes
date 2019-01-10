import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { NoteListHeader } from './NoteListHeader';
import { spy } from 'sinon';
import { notes } from '../fixtures/fixtures';
import '../util/EnzmeConfigure';

if (Meteor.isClient) {
    describe('NoteListHeader', function() {
        let meteorCall;
        let Session;

        beforeEach(function() {
            meteorCall = spy();
            Session = {
                set: spy()
            };
        });
        it('should call meteorCall on click', function() {
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <NoteListHeader meteorCall={meteorCall} Session={Session} />
                </MemoryRouter>
            );
            wrapper.find('button').simulate('click');
            meteorCall.getCalls()[0].callback(undefined, notes[0]._id);
            expect(meteorCall.getCalls()[0].args[0]).equal('notes.insert');
            expect(Session.set.calledWith('selectedNoteId', notes[0]._id)).to.be.ok;
        });

        it('should not set session for failed insert', function() {
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <NoteListHeader meteorCall={meteorCall} Session={Session} />
                </MemoryRouter>
            );
            wrapper.find('button').simulate('click');
            meteorCall.getCalls()[0].callback({ err: 'error' }, undefined);
            expect(meteorCall.getCalls()[0].args[0]).equal('notes.insert');
            expect(Session.set.calledWith('selectedNoteId', notes[0]._id)).to.not.be.ok;
        });
    });
}
