import Component from '@ember/component';

export default Component.extend({
    actions: {
        addElement(list) {
            console.log("Add element to:", list.get("name"));
        }
    }
});
