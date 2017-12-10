import Service from '@ember/service';
import Ember from "ember";

export default Service.extend({
    store: Ember.inject.service(),

    subscribeToElement(boardElement, board) {
        console.log("Subscribe to: ", Ember.get(boardElement, "name"));
        let allElements = Ember.get(board, "elements");
        for (let e of allElements) {
            let subs = Ember.get(e, "subscribers");
            subs.splice(subs.indexOf(1), 1);
        }

        let elementSubs = Ember.get(boardElement, "subscribers")
        elementSubs.push(1);
        Ember.set(boardElement, "subscribers",  elementSubs);

        return boardElement;
    },
    addElement(board) {
        console.log("New element to: ", board.get("name"));

        let newElement = {
            name: "new Name",
            category: 0,
            procuder: 1,
            subscribers: []
        };
        board.get("elements").push(newElement);
        //board.save();
    }
});
