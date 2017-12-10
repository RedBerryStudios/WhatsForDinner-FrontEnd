import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    store: Ember.inject.service(),
    
    showName: Ember.computed.not("onlyImage"),

    size: "small",

    isSmall: Ember.computed.equal("size", "small"),
    
    member: Ember.computed("memberId", function() {
        let mId = this.get("memberId");
        if (mId) {
            return this.get("store").find("member", mId);
        }
    })
});
