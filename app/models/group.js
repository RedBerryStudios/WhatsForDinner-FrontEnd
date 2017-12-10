import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr("string"),
    joinToken: DS.attr("string"),
    members: DS.hasMany("member", {inverse: null, async: true}),
    days: DS.attr(),
    checklists: DS.hasMany("checklist", {inverse: null, async:true})
});
