import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class Signup extends Component {
    constructor() {
        super();
        this.state = {
            error: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if (password.length < 9) {
            return this.setState({ error: 'Password must be more than 8 characters long' });
        }

        this.props.createUser({ email, password }, err => {
            // this callback function will be called with err as argument if there is an error, otherwise will be called with no argument
            if (err) {
                this.setState({ error: err.reason });
            } else {
                this.setState({ error: '' });
            }
        });
    }
    render() {
        return (
            <div className='boxed-view'>
                <div className='boxed-view__box'>
                    <h1>Join</h1>
                    <small>by Dennis Juanito</small>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view__form'>
                        <input type='email' ref='email' name='email' placeholder='Email' />
                        <input type='password' ref='password' name='password' placeholder='Password' />
                        <button className='button'>Create Account</button>
                    </form>
                    <Link to='/'>Already have an account?</Link>
                </div>
            </div>
        );
    }
}

Signup.propTypes = {
    createUser: PropTypes.func.isRequired
};

export default withTracker(() => {
    return {
        createUser: Accounts.createUser
    };
})(Signup);
