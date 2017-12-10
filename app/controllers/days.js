import Ember from "ember";
import Controller from '@ember/controller';

export default Controller.extend({
    session: Ember.inject.service(),
    ajax: Ember.inject.service(),
    
    authMemberId: Ember.computed.oneWay("session.data.authenticated.member.id"),

    authMemberGroupId: Ember.computed.oneWay("session.data.authenticated.member.group"),

    activeDay: 3,

    /*
    group: Ember.computed("authMemberGroupId", function () {
        let groupId = this.get("authMemberGroupId");
        
        return this.store.findRecord("group", groupId);
    }),
    */

    group: Ember.computed.alias("model.group"),

    days: Ember.computed("{group.days,activeDay}", function() {
        let days = this.get("group.days");

        if (days) {
            return days.map((d, index) => {
                let boards = Ember.get(d, "boards");
                boards.forEach(b => {
                    let newElements = Ember.get(b, "elements").map(e => {
                        let i = Ember.get(e, "subscribers")
                            .findIndex(s => Ember.get(s, "id") == this.get("authMemberId"));
                        if (i >= 0) {
                            Ember.set(e, "active", true);
                        } else {
                            Ember.set(e, "active", false);
                        }
                        return e;
                    });

                    Ember.set(b, "elements", newElements);
                });

                return {
                    date: Ember.get(d, "date"),
                    boards: boards,
                    active: index == this.get("activeDay")
                };
            });
        }
    }),

    actions: {
        addElement(board) {
            if (Ember.isEmpty(board.newElementCategory) || Ember.isEmpty(board.newElementName)) {
                return;
            }

            this.store.findRecord("board", board.id)
                .then(function(boardRecord) {
                    let elements = boardRecord.get("elements");

                    let newElement = {
                        name: board.newElementName,
                        category: board.newElementCategory,
                        producer: parseInt(this.get("authMemberId")),
                        subscribers:[]
                    };

                    elements.push(newElement);

                    boardRecord.save().then(function () {
                        let groupId = this.get("authMemberGroupId");
                        this.store.findRecord("group", groupId)
                            .then(function(group) {
                                this.set("group", group);
                            }.bind(this));
                    }.bind(this));
                }.bind(this));
        },
        selectCategory(board, category) {
            board["newElementCategory"] = category.target.value;
        },
        prevActiveDay() {
            this.set("activeDay", Math.max(this.get("activeDay") - 1,  0));
        },
        nextActiveDay() {
            this.set("activeDay", Math.min(this.get("activeDay") + 1, 6));
        },
        removeElement(board, elementIndex) {
            this.store.findRecord("board", board.id)
                .then(function(boardRecord) {
                    boardRecord.get("elements").splice(elementIndex, 1);
                    boardRecord.save()
                        .then(function() {
                            let groupId = this.get("authMemberGroupId");
                            this.store.findRecord("group", groupId)
                                .then(function(group) {
                                    this.set("group", group);
                                }.bind(this));
                        }.bind(this));
                }.bind(this));

        },
        subscribeToElement(element, board) {
            this.get("ajax").request("/boards/" + Ember.get(board, "id") + "/subscribe", {
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({boardElementId:Ember.get(element, "id")})
            })
                .then(function() {
                    let groupId = this.get("authMemberGroupId");
                    this.store.findRecord("group", groupId)
                        .then(function(group) {
                            this.set("group", group);
                        }.bind(this)); 
                }.bind(this));
        }
    }
});
