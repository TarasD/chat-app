import {FlowRouter} from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

//Layouts and Pages
import App from '../ui/App';
import Content from '../ui/Content';
import Account from '../ui/Account';
import Login from '../ui/Login';
import Register from '../ui/Register';

FlowRouter.route('/', {
    name: 'homepage',
    triggersEnter: [checkAuth],
    action() {
        mount(App, { content: <Content /> })
    }
});
FlowRouter.route('/account/profile', {
    name: 'profile',
    action() {
        mount(App, { content: <Account tab="profile"/> })
    }
});
FlowRouter.route('/account/settings', {
    name: 'settings',
    action() {
        mount(App, { content: <Account tab="settings"/> })
    }
});
FlowRouter.route('/login', {
    name: 'login',
    action() {
        mount(App, { content: <Login /> })
    }
});
FlowRouter.route('/register', {
    name: 'register',
    action() {
        mount(App, { content: <Register /> })
    }
});

function checkAuth() {
    if(!Meteor.userId()) {
        FlowRouter.redirect('/login');
    }
}