import { expect } from 'chai';
import { validateNewUserCallBack } from './users';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    describe('users', function() {
        it('should allow valid email address', function() {
            const testUser = {
                emails: [
                    {
                        address: 'Test@example.com'
                    }
                ]
            };
            const res = validateNewUserCallBack(testUser);

            expect(res).to.equal(true);
        });

        it('should reject invalid email', function() {
            const testUser = {
                emails: [
                    {
                        address: 'not a valid email'
                    }
                ]
            };
            expect(() => {
                validateNewUserCallBack(testUser);
            }).to.throw();
        });
    });
}
