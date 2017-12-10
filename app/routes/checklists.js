import Route from '@ember/routing/route';
import Ember from "ember";
import RSVP from "rsvp";
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
    session: Ember.inject.service(),
    
    authMemberGroupId: Ember.computed.oneWay("session.data.authenticated.member.group"),

    beforeModel() {
        if (!this.get("authMemberGroupId")) {
            this.transitionTo("me");
        }
    },

    model() {
        let checklists = this.get("store").findAll("checklist");
        return new RSVP.hash({
            checklists
        });
    }
});
