import Ember from "ember";
import Controller from '@ember/controller';

export default Controller.extend({
    session: Ember.inject.service(),
    ajax: Ember.inject.service(),

    authMemberId: Ember.computed.oneWay("session.data.authenticated.member.id"),

    authMemberGroupId: Ember.computed.oneWay("session.data.authenticated.member.group"),

    /*
    member: Ember.computed("authMemberId", function () {
        return this.store.findRecord("member", this.get("authMemberId"));
    }),

    group: Ember.computed("authMemberGroupId", function() {
        let groupId = this.get("authMemberGroupId");

        if (groupId) {
            return this.store.findRecord("group", groupId);
        }
    }),
    */

    member: Ember.computed.alias("model.member"),

    group: Ember.computed.alias("model.group"),

    isNotInGroup: Ember.computed.none("authMemberGroupId"),

    joinToken: "",

    newGroupName: "",

    actions: {
        saveMemberDetails() {
            if (Ember.isEmpty(this.get("model.member.name"))) {
                return;
            } 

            this.store.findRecord("member", this.get("authMemberId"))
                .then(m => m.save());
        },
        createNewGroup() {
            let newGroupName = this.get("newGroupName");

            if (Ember.isEmpty(newGroupName)) {
                return;
            }

            this.store.createRecord("group", {
                name: newGroupName
            })
                .save()
                .then(function() {
                    $("#createGroupModal").modal("hide");
                    this.get('session').invalidate();
                });
        },
        leaveGroup() {
            this.store.findRecord("group", this.get("authMemberGroupId"))
                .then(function(group) {
                    let members = group.get("members").filter(m => m.get("id") != this.get("authMemberId"));

                    console.log("filtered members", members);

                    group.set("members", members);

                    console.log("set members", group.get("members"));

                    group.save().then(function() {
                        this.get("session").invalidate();
                    }.bind(this));
                }.bind(this))
        },
        joinGroup() {
            if (Ember.isEmpty(this.get("joinToken"))) {
                return;
            }

            this.get("ajax").request("/groups/join", {
                type:     'POST',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ 'joinToken': this.get("joinToken") })
            })
            .then(function(response) {
                this.get("session").invalidate();
            }.bind(this));
        }
    }

});
