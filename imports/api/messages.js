import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
    Meteor.publish('messages', () => {
        return Messages.find();
    });
}

Meteor.methods({
    'messages.insert' (text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        // let date = new Date();
        // date = new Date(date.getTime() - 1000*60*60*24*365);

        Messages.insert({
            text,
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
            createdAt: new Date()
        })
    }
});