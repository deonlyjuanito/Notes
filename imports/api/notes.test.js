import { expect } from 'chai';
import { Meteor } from 'meteor/meteor';
import { Notes } from './notes.js';

if (Meteor.isServer) {
    describe('notes', function() {
        const noteOne = {
            _id: 'testNoteId1',
            title: 'My title',
            body: 'My body for note',
            updateAt: 0,
            userId: 'testUserId1'
        };
        const noteTwo = {
            _id: 'testNoteId2',
            title: 'Things to buy',
            body: 'ipad',
            updateAt: 0,
            userId: 'testUserId2'
        };
        beforeEach(function() {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        });
        it('should insert new note', function() {
            const userId = 'testId';
            const _id = Meteor.server.method_handlers['notes.insert'].bind({ userId })();
            expect(Notes.findOne({ _id, userId })).to.exist;
        });

        it('should not insert note if not authenticated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.insert'].bind({})();
            }).to.throw();
        });

        it('should remove note', function() {
            Meteor.server.method_handlers['notes.remove'].call({ userId: noteOne.userId }, noteOne._id);
            expect(Notes.findOne({ _id: noteOne._id })).to.not.exist;
        });

        it('should not remove note if unauthenticated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
            }).to.throw();
        });

        it('should not remove note if invalid_id', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].bind({ userId: noteOne.userId })('');
            }).to.throw();
        });

        it('should update note', function() {
            const title = 'This is an updated title';
            Meteor.server.method_handlers['notes.update'].apply(
                {
                    userId: noteOne.userId
                },
                [noteOne._id, { title }]
            );

            const note = Notes.findOne(noteOne._id);

            expect(note.updateAt).to.be.above(0);
            expect(note).to.include({
                title,
                body: noteOne.body // body does not change
            });
        });

        it('should throw error if extra updates provided', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply(
                    {
                        userId: noteOne.userId
                    },
                    [noteOne._id, { title: 'new title', name: 'dennis' }]
                );
            }).to.throw();
        });

        it('should not update note if user was not creator', function() {
            const title = 'This is an updated title';
            Meteor.server.method_handlers['notes.update'].apply(
                {
                    userId: 'testId'
                },
                [noteOne._id, { title }]
            );

            const note = Notes.findOne(noteOne._id);
            expect(note).to.include(noteOne);
        });

        it('should not update note if unauthenticated', function() {
            const title = 'This is an updated title';
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id, { title }]);
            }).to.throw();
        });

        it('should not update note if invalid_id', function() {
            const title = 'This is an updated title';
            expect(() => {
                Meteor.server.method_handlers['notes.update'].bind({ userId: noteOne.userId })('', { title });
            }).to.throw();
        });

        it('should return a users notes', function() {
            const res = Meteor.server.publish_handlers.notesToSubscribe.apply({ userId: noteOne.userId });
            const notes = res.fetch();
            expect(notes.length).to.equal(1);
            expect(notes[0]).to.deep.equal(noteOne);
        });

        it('should return zero notes for user that has none', function() {
            const res = Meteor.server.publish_handlers.notesToSubscribe.bind({ userId: 'testId' })();
            const notes = res.fetch();
            expect(notes.length).to.equal(0);
        });
    });
}
