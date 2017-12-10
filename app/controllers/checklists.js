import Controller from '@ember/controller';
import Ember from "ember";

export default Controller.extend({
    checklists: Ember.computed.alias("model.checklists"),

    newListName: "",

    actions: {
        addElement(checklist) {
            if (Ember.isEmpty(checklist.get("newElementText"))) {
                return;
            }

            let newElement = {
                text: checklist.get("newElementText"),
                isComplete: false
            };

            checklist.get("elements").push(newElement);
            checklist.save()
                .then(function() {
                    checklist.set("newElementText", "");
                });
        },
        stateChange(checklist, element, state) {
            Ember.set(element, "isComplete", state.target.checked)

            checklist.save();
        },
        deleteElement(checklist, index) {
            Ember.get(checklist, "elements").splice(index, 1);

            checklist.save();
        },
        deleteList(checklist) {
            checklist.destroyRecord();
        },
        addList() {
            if (Ember.isEmpty(this.get("newListName"))) {
                return;
            }

            this.store.createRecord("checklist", {
                name: this.get("newListName")
            })
                .save()
                .then(function() {
                    $("#createListModal").modal("hide");

                    this.set("newListName", "");
                }.bind(this));
        }
    }
});
