import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import Ember from 'ember';
import jwtDecode from "ember-jwt-decode";

export default ToriiAuthenticator.extend({
  torii: Ember.inject.service(),
  ajax: Ember.inject.service(),

  authenticate() {
    const ajax = this.get('ajax');

    return this._super(...arguments).then((data) => {
      return ajax.request('/auth', {
        type:     'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ 'provider': data.provider, 'code': data.authorizationCode })
      }).then((response) => {
        let payload = jwtDecode(response.jwt);

        return {
          provider: data.provider,
          jwt: response.jwt,
          member: {
            id: payload.sub,
            group: payload.groupId
          }
        };
      });
    });
  }
});