import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import classnames from 'classnames';
import { createContainer } from 'meteor/react-meteor-data';

class Account extends Component {
    constructor(props) {
        super(props);

        if(props.currentUser) {
            this.state = {
                active: props.tab,
                firstName: props.currentUser.profile.firstName,
                lastName: props.currentUser.profile.lastName,
                username: props.currentUser.username
            };
        }
        else {
            this.state = {
                active: props.tab,
                firstName: '',
                lastName: '',
                username: ''
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {
            this.setState({
                active: nextProps.tab,
                firstName: nextProps.currentUser.profile.firstName,
                lastName: nextProps.currentUser.profile.lastName,
                username: nextProps.currentUser.username
            });
        }
    }

    // changeTab(tab) {
    //     this.setState({ active: tab.target.innerHTML.toLowerCase()} );
    // }

    submitUser(event) {
        event.preventDefault();

        let {firstName, lastName} = this.state;
        Meteor.call('users.update', {firstName, lastName});
    }
    inputChange(el, event) {
        this.setState({
            [el]: event.target.value.trim()
        });
    }

    render() {
        const classesAcc = classnames({
            'sidebar-element': true,
            'active': this.state.active == 'profile',
        });
        const classesSet = classnames({
            'sidebar-element': true,
            'active': this.state.active == 'settings',
        });
        const classesAccTab = classnames({
            'account-tab': true,
            'active': this.state.active == 'profile',
        });
        const classesSetTab = classnames({
            'account-tab': true,
            'active': this.state.active == 'settings',
        });

        if (this.props.currentUser) {
            return (
                <div className="account-wrapper">
                    <ul className="account-sidebar">
                        <li className={classesAcc}><a href="/account/profile">Profile</a></li>
                        <li className={classesSet}><a href="/account/settings">Settings</a></li>
                    </ul>
                    <div className="account-content">
                        <div className={classesAccTab}>
                            <h2>User profile</h2>

                            <form onSubmit={this.submitUser.bind(this)}>
                                <label className="profile-label">First name:</label>
                                <input className="profile-input" type="text" value={this.state.firstName} onChange={this.inputChange.bind(this, 'firstName')} placeholder="first name" />

                                <label className="profile-label">Last name:</label>
                                <input className="profile-input" type="text" value={this.state.lastName} onChange={this.inputChange.bind(this, 'lastName')} placeholder="first name" />

                                <label className="profile-label">Username:</label>
                                <p className="profile-input">{this.state.username}</p>

                                <button className="submit-profile">Save</button>
                            </form>

                        </div>

                        <div className={classesSetTab}>
                            <p>Manage password</p>
                            <p>Do something more</p>
                        </div>
                    </div>
                </div>
            );
        }
        else return null;
    }


}

Account.propTypes = {
    currentUser: PropTypes.object,
    tab: PropTypes.string.isRequired
};

export default createContainer(() => {
    return {
        currentUser: Meteor.users.findOne({_id: Meteor.userId()})
    }
}, Account);