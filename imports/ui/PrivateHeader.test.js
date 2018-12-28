import { Meteor } from 'meteor/meteor';
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { PrivateHeader } from './PrivateHeader.js';
import { spy } from 'sinon';
import '../util/EnzmeConfigure';

if (Meteor.isClient) {
    describe('PrivateHeader', function() {
        it('should set button text to logout', () => {
            const wrapper = mount(<PrivateHeader title='Test title' handleLogout={() => {}} />);
            const buttonText = wrapper.find('button').text();
            expect(buttonText).to.equal('Log out');
        });

        it('should use title prop as h1 text', function() {
            const title = 'Test title here';
            const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}} />);
            const h1Text = wrapper.find('h1').text();
            expect(h1Text).to.equal(title);
        });

        it('should call the function', function() {
            let spyCallback = spy();
            const wrapper = mount(<PrivateHeader title='Test title' handleLogout={spyCallback} />);
            wrapper.find('button').simulate('click');
            wrapper.find('button').simulate('click');
            expect(spyCallback.callCount).to.equal(2);
        });
    });
}
