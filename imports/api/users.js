import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.methods({
    'users.update' (userProfile) {
        check(userProfile, Object);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        console.log(userProfile);

        Meteor.users.update({_id: this.userId}, { $set: {profile: userProfile} });
    }
});