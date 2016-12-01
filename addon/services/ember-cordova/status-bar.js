import Ember from 'ember';

const {
  computed,
  Service,
  inject
} = Ember;

export default Service.extend({

  _count: 0,
  _statusbar: null,
  cordova: inject.service('cordova'),

  hide() {
    let count = this.get('_count');

    count--;
    if (count < 0) {
      count = 0;
    }
    this.set('_count', count);
    this.update();
  },

  show() {
    this.incrementProperty('_count');
    this.update();
  },

  status() {
    return this.get('_count');
  },

  isHidden: computed.not('isVisible'),
  isVisible: computed.bool('_count'),

  update() {
    if (this._statusbar) {
      if (this.get('isHidden')) {
        this._statusbar.hide();
      } else {
        this._statusbar.show();
      }
    }
  },

  init() {
    this._super();
    this.get('cordova').ready()
      .then(() => {
        this._statusbar = window.StatusBar;
        this.update();
      });
  }

});
