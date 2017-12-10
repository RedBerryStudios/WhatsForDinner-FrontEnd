import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  host: "http://localhost:3000",

  session: Ember.inject.service(),
  headers: Ember.computed('session.data.authenticated.jwt', {
    get() {
      let headers = {};
      const authToken = this.get('session.data.authenticated.jwt');
      if (authToken) {
        headers['Authorization'] = "Bearer " + authToken;
      }
      return headers;
    }
  })
});