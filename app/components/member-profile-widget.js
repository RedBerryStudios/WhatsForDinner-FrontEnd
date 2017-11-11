import Component from '@ember/component';

export default Component.extend({
    actions: {
        showMember(member) {
            alert(member.name);
        }
    }
});
