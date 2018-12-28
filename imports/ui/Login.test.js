import { Meteor } from 'meteor/meteor';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Login } from './Login.js';
import { spy } from 'sinon';
import '../util/EnzmeConfigure';

if (Meteor.isClient) {
    describe('Login', function() {
        it('should show error messages', function() {
            const error = 'This is not working';
            const wrapper = shallow(<Login loginWithPassword={() => {}} />);
            wrapper.setState({ error });
            const errorText = wrapper.find('p').text();
            expect(errorText).to.equal(error);

            wrapper.setState({ error: '' });
            expect(wrapper.find('p').length).to.equal(0);
        });

        it('should call loginWithPassword with the form data', function() {
            const email = 'dennisjuanito@gmail.com';
            const password = 'dennis123';
            const spyCallBack = spy();
            // uses memory router instead of shallow
            // const wrapper = shallow(<Login loginWithPassword={spyCallBack} />);
            const wrapper = mount(
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Login loginWithPassword={spyCallBack} />
                </MemoryRouter>
            );

            wrapper.find('input[name="email"]').instance().value = email;
            wrapper.find('input[name="password"]').instance().value = password;
            wrapper.find('form').simulate('submit');

            expect(spyCallBack.getCalls()[0].args[0]).to.deep.equal({ email });
            expect(spyCallBack.getCalls()[0].args[1]).to.deep.equal(password);
        });

        it('should set loginWithPassword callback errors', function() {
            const spyCallBack = spy();
            // uses memory router instead of shallow
            // const wrapper = shallow(<Login loginWithPassword={spyCallBack} />);
            const wrapper = mount(
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Login loginWithPassword={spyCallBack} />
                </MemoryRouter>
            );

            // got this solution from lecture 129 Q & A
            wrapper.find('form').simulate('submit');
            spyCallBack.getCalls()[0].args[2]({});
            expect(wrapper.find(Login).instance().state).to.not.equal({});

            spyCallBack.getCalls()[0].args[2]();
            expect(wrapper.find(Login).instance().state).to.deep.equal({ error: '' });
        });
    });
}
