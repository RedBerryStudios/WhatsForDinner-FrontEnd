import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  // Application specific overrides go here
  authorizer: 'authorizer:jwt',
  host: "http://localhost:3000"
});