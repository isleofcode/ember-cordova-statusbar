import Ember from 'ember';

const {
  computed,
  Service
} = Ember;

export default Service.extend({

  _count: 0,

  show() {
    let COUNT = this.get('_count');
    COUNT--;
    if (COUNT < 0) {
      COUNT = 0;
    }
    this.set('_count', COUNT);
    this.update();
  },

  hide() {
    this.incrementProperty('_count');
    this.update();
  },

  status() {
    return this.get('_count');
  },

  isHidden: computed.bool('_count'),

  update() {

    if (window.StatusBar) {
      if (this.get('isHidden')) {
        window.StatusBar.hide();
      } else {
        window.StatusBar.show();
      }
    }
  }

});
