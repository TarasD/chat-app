import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {FlowRouter} from 'meteor/kadira:flow-router';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {error: ''};
    }

    loginSubmit(event) {
        event.preventDefault();

        let username = ReactDOM.findDOMNode(this.refs.username).value.trim();
        let password = ReactDOM.findDOMNode(this.refs.password).value.trim();

        console.log(username, password);

        Meteor.loginWithPassword(username, password, (err) => {
            if(err) this.setState({error: err.reason});
            else FlowRouter.redirect('/');
        });

    }

    render() {
        return (
            <div className="login-wrapper user-accounts">
                <form className="user-form" onSubmit={this.loginSubmit.bind(this)}>
                    <label className="form-label" htmlFor="username">Username</label>
                    <input type="text" id="username" ref="username" className="form-input" placeholder="username" />

                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" ref="password" className="form-input" placeholder="password" />

                    <button className="form-input form-submit">Log in</button>
                </form>
                <a className="account-option" href="/register">Create account</a>
                <p className="form-error">{this.state.error}</p>
            </div>
        );
    }
}