import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({

    name: Ember.computed("category", function () {
        switch (this.get("category")) {
            case "leftover":
                return "Leftover";
            case "cooking":
                return "Cooking";
            case "takeout":
                return "Take-out";
        }
    }),

    icon: Ember.computed("category", function () {
        switch (this.get("category")) {
            case "leftover":
                return "home";
            case "cooking":
                return "cutlery";
            case "takeout":
                return "phone";
        }
    }),

    showName: Ember.computed.not("onlyImage")

});
