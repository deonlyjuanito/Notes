import { Meteor } from 'meteor/meteor';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Signup } from './Signup.js';
import { spy } from 'sinon';
import '../util/EnzmeConfigure';

if (Meteor.isClient) {
    describe('Signup', function() {
        it('should show error messages', function() {
            const error = 'This is not working';
            const wrapper = shallow(<Signup createUser={() => {}} />);
            wrapper.setState({ error });
            const errorText = wrapper.find('p').text();
            expect(errorText).to.equal(error);

            wrapper.setState({ error: '' });
            expect(wrapper.find('p').length).to.equal(0);
        });

        it('should call createUser with the form data', function() {
            const email = 'dennisjuanito@gmail.com';
            const password = 'dennis123';
            const spyCallBack = spy();
            // uses memory router instead of shallow
            // const wrapper = shallow(<Login loginWithPassword={spyCallBack} />);
            const wrapper = mount(
                <MemoryRouter initialEntries={['/signup']} initialIndex={0}>
                    <Signup createUser={spyCallBack} />
                </MemoryRouter>
            );

            wrapper.find('input[name="email"]').instance().value = email;
            wrapper.find('input[name="password"]').instance().value = password;
            wrapper.find('form').simulate('submit');

            expect(spyCallBack.getCalls()[0].args[0]).to.deep.equal({ email, password });
        });

        it('should should set error if short password', function() {
            const email = 'dennisjuanito@gmail.com';
            const password = '123';
            const spyCallBack = spy();
            // uses memory router instead of shallow
            // const wrapper = shallow(<Login loginWithPassword={spyCallBack} />);
            const wrapper = mount(
                <MemoryRouter initialEntries={['/signup']} initialIndex={0}>
                    <Signup createUser={spyCallBack} />
                </MemoryRouter>
            );

            wrapper.find('input[name="email"]').instance().value = email;
            wrapper.find('input[name="password"]').instance().value = password;
            wrapper.find('form').simulate('submit');
            expect(wrapper.find(Signup).instance().state.error.length).to.not.equal(0);
        });

        it('should set loginWithPassword callback errors', function() {
            const password = 'dennis123';
            const reason = 'This is why it failed';
            const spyCallBack = spy();
            // uses memory router instead of shallow
            // const wrapper = shallow(<Login loginWithPassword={spyCallBack} />);
            const wrapper = mount(
                <MemoryRouter initialEntries={['/signup']} initialIndex={0}>
                    <Signup createUser={spyCallBack} />
                </MemoryRouter>
            );

            // got this solution from lecture 129 Q & A
            wrapper.find('input[name="password"]').instance().value = password;
            wrapper.find('form').simulate('submit');

            spyCallBack.getCalls()[0].args[1]({ reason });
            expect(wrapper.find(Signup).instance().state.error).equal(reason);

            spyCallBack.getCalls()[0].args[1]();
            expect(wrapper.find(Signup).instance().state).to.deep.equal({ error: '' });
        });
    });
}
