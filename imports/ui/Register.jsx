import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {FlowRouter} from 'meteor/kadira:flow-router';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = { error: ''};
    }

    registerSubmit(event) {
        event.preventDefault();

        let username = ReactDOM.findDOMNode(this.refs.username).value.trim();
        let password = ReactDOM.findDOMNode(this.refs.password).value.trim();
        let confirmPassword = ReactDOM.findDOMNode(this.refs.confirmPassword).value.trim();

        // Register validation
        // All fields should not be empty
        if(!username || !password || !confirmPassword) {
            this.setState({error: 'Fill all fields'});
        }
        // Password length minimum 6 digits
        else if(password.length < 6) {
            this.setState({error: 'Password is too short'});
        }
        //Passwords not matching
        else if(password !== confirmPassword) {
            this.setState({error: 'Passwords not matching'});
        }
        else {
            Accounts.createUser({
                username: username,
                password: password,
                profile: {}
            }, (err) => {
                if(err) this.setState({error: err.reason});
                else FlowRouter.redirect('/');
            });
        }

        console.log(username, password, confirmPassword);
    }

    render() {
        return (
            <div className="register-wrapper user-accounts" onSubmit={this.registerSubmit.bind(this)}>
                <form className="user-form">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input type="text" id="username" ref="username" className="form-input" placeholder="username" />

                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" ref="password" className="form-input" placeholder="password" />

                    <label className="form-label" htmlFor="confirm-password">Confirm password</label>
                    <input type="password" id="confirm-password" ref="confirmPassword" className="form-input" placeholder="password" />

                    <button className="form-input form-submit">Sign up</button>
                </form>
                <a className="account-option" href="/login">Log in</a>
                <p className="form-error">{this.state.error}</p>
            </div>
        );
    }
}