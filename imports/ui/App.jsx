import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import {FlowRouter} from 'meteor/kadira:flow-router';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideDropdown: true,
            timeoutId: undefined
        }
    }

    showDropdown () {
        clearTimeout(this.state.timeoutId);
        this.setState({timeoutId: undefined});

        this.setState({hideDropdown: false});
    }
    hideDropdown () {
        let timeoutId =  setTimeout(() => {
            this.setState({hideDropdown: true});
        }, 1500);
        this.setState({timeoutId: timeoutId});
    }
    logout () {
        console.log('logout');
        FlowRouter.redirect('/login');
        Meteor.logout();
    }

    render() {
        const classes = classnames({
            'user-dropdown': true,
            'hide': this.state.hideDropdown,
        });
        return (
            <div className="container">
                <header>
                    <h1><a className="main-title" href="/">Chat app</a></h1>


                    { this.props.currentUser ?
                        <div className="user-block" onMouseLeave={this.hideDropdown.bind(this)}>
                            <span className="logged-user" onMouseEnter={this.showDropdown.bind(this)}>{this.props.currentUser.username}</span>
                            <ul className={classes}>
                                <li className="user-dropdown-el"><a href="/account/profile">Account</a></li>
                                <li className="user-dropdown-el"><a href="/account/settings">Settings</a></li>
                                <li className="user-dropdown-el" onClick={this.logout.bind(this)}>Logout</li>
                            </ul>
                        </div>
                        : ''
                    }

                </header>

                <div className="app-content">
                    {this.props.content}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    currentUser: PropTypes.object
};

export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, App);