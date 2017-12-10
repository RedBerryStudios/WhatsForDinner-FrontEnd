import Route from '@ember/routing/route';
import Ember from "ember";
import RSVP from "rsvp";
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
    session: Ember.inject.service(),

    authMemberId: Ember.computed.oneWay("session.data.authenticated.member.id"),

    authMemberGroupId: Ember.computed.oneWay("session.data.authenticated.member.group"),

    model() {
        let member = this.store.findRecord("member", this.get("authMemberId"));
    
        let groupId = this.get("authMemberGroupId");
        
        let group;
        if (groupId) {
            group = this.store.findRecord("group", groupId); 
        }

        return new RSVP.hash({
            member,
            group
        });
    }
});
