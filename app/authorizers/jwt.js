import OAuth2Bearer from 'ember-simple-auth/authorizers/oauth2-bearer';
import Ember from 'ember';

const { isEmpty } = Ember;

export default OAuth2Bearer.extend({
    authorize(data, block) {
        const jwt = data.jwt;
    
        if (!isEmpty(jwt)) {
          block('Authorization', `Bearer ${jwt}`);
        }
      }
});