import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin,{   
    attrs: {
       days: { embedded: 'always' },
       checklists: { embedded: 'always' },
       members: { embedded: 'always'}
  }
});