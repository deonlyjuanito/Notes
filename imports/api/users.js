import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

// this function will call the callback whenever new user sign in
Accounts.validateNewUser(user => {
    const email = user.emails[0].address;

    new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).validate({
        email
    });

    return true; // this is a required return. The validateNewUser must return a true value to indicate that the validation is sucessfull
});
