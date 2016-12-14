import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import {Messages} from '../api/messages';

class Content extends Component {

    componentDidUpdate() {
        ReactDOM.findDOMNode(this.refs.messagesWrapper).scrollTop = ReactDOM.findDOMNode(this.refs.messagesWrapper).scrollHeight;
    }

    sendMessage(event) {
        event.preventDefault();

        let message = ReactDOM.findDOMNode(this.refs.message).value.trim();
        if(message.length) {
            Meteor.call('messages.insert', message);
            ReactDOM.findDOMNode(this.refs.message).value = '';
        }
    }

    renderMessage() {
        let added = [];
        return this.props.messages.map((el, i) => {
            let day = moment(el.createdAt).format('YYYY:MM:DD'),
                dateLine = '';

            // Add separator line before first message of day
            if(added.indexOf(day) === -1) {
                dateLine = (
                    <div className="line"><span className="line-text">{moment(el.createdAt).format('MMMM, Do')}</span></div>
                );
                added.push(day);
            }

            return (
                <div key={i} className="single-message">
                    {dateLine}
                    <span className="message-author">{el.username}</span>
                    <span className="message-date">{moment(el.createdAt).format('HH:mm:ss')}</span>
                    <p className="message-text">{el.text}</p>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="messages-wrapper" ref="messagesWrapper">

                    {this.renderMessage()}

                </div>
                <form className="input-wrapper" onSubmit={this.sendMessage.bind(this)}>
                    <input type="text" className="message-input" ref="message" placeholder="type your message here"/>
                </form>
            </div>
        );
    }
}

Content.propTypes = {
    messages: PropTypes.array.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('messages');

    return {
        messages: Messages.find({}, { sort: { createdAt: 1 } }).fetch(),
        currentUser: Meteor.user()
    };
}, Content);