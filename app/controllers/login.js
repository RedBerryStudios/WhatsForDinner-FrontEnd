import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticateWithFacebook() {
      let modal = $('#loginModal').modal();
      this.get('session').authenticate('authenticator:torii', 'facebook')
        .then(() => {
          modal.modal("hide");
          this.transitionToRoute("/");
        });  
    },

    authenticateWithGoogle() {
      let modal = $('#loginModal').modal();
      this.get('session').authenticate('authenticator:torii', 'google')
        .then(() => {
          modal.modal("hide");
          this.transitionToRoute("/");
        });
    }
  }
});
