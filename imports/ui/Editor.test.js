import { Meteor } from 'meteor/meteor';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Editor } from './Editor.js';
import { spy } from 'sinon';
import { notes } from '../fixtures/fixtures';
import '../util/EnzmeConfigure';

if (Meteor.isClient) {
    describe('Editor', function() {
        let call;

        beforeEach(function() {
            call = spy();
        });

        it('should render pick note message', function() {
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <Editor call={call} />
                </MemoryRouter>
            );
            expect(wrapper.find('p').text()).equal('Pick or create a note to get started.');
        });

        it('should render Note not found message', function() {
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <Editor selectedNoteId={notes[0]._id} call={call} />
                </MemoryRouter>
            );
            expect(wrapper.find('p').text()).equal('Note not found.');
        });

        it('should remove note', function() {
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} />
                </MemoryRouter>
            );

            wrapper.find('button').simulate('click');
            expect(call.withArgs('notes.remove', notes[0]._id).callCount).equal(1);
            // expect(call.getCalls().length).equal(2);
        });

        it('should update the note body on textarea change', function() {
            const newBody = 'This is my new body text';
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} />
                </MemoryRouter>
            );

            wrapper.find('textarea').simulate('change', {
                target: {
                    value: newBody
                }
            });
            expect(wrapper.find(Editor).instance().state.body).equal(newBody);
            expect(call.withArgs('notes.update', notes[0]._id, { body: newBody }));
        });

        it('should update the note title on input change', function() {
            const newTitle = 'This is my new title text';
            const wrapper = mount(
                <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
                    <Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} />
                </MemoryRouter>
            );

            wrapper.find('input').simulate('change', {
                target: {
                    value: newTitle
                }
            });
            expect(wrapper.find(Editor).instance().state.title).equal(newTitle);
            expect(call.withArgs('notes.update', notes[0]._id, { title: newTitle }));
        });

        // it('should set state for new note', function() {
        //     const wrapper = mount(
        //         <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
        //             <Editor call={call} />
        //         </MemoryRouter>
        //     );

        //     wrapper.setProps({
        //         selectedNoteId: notes[0]._id,
        //         notes: notes[0]
        //     });

        //     console.dir(wrapper.instance());
        //     expect(wrapper.find(Editor).state().title).equal(notes[0].title);
        //     expect(wrapper.find(Editor).state().body).equal(notes[0].body);
        // });
    });
}
