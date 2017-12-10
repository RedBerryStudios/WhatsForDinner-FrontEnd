import Controller from '@ember/controller';
import Ember from "ember";

export default Controller.extend({
    session: Ember.inject.service('session'),

    currentMember: Ember.computed("session.data.authenticated.member.id", function() {
        return this.store.find("member", this.get("session.data.authenticated.member.id"));
    }),

    actions: {
        invalidateSession() {
            this.get('session').invalidate();
        }
    }
});
