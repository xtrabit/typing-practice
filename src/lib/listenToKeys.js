const listenToKeys = {
  cbUp: null,
  cbDown: null,
  start: function(cbDown, cbUp) {
    this.cbUp = cbUp;
    this.cbDown = cbDown;
    window.addEventListener('keydown', this.cbDown);
    window.addEventListener('keyup', this.cbUp);
  },
  stop: function() {
    window.removeEventListener('keydown', this.cbDown);
    window.removeEventListener('keyup', this.cbUp);
    this.cbUp = null;
    this.cbDown = null;
  }
};

export default listenToKeys;
