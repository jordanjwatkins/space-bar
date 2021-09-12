function onServeButtonClick() {
  this.elServeButton.classList.add('active');

  const result = this.checkGlass();

  this.sounds.buttonPress();

  setTimeout(() => {
    this.elServeButton.classList.remove('active');
    this.elServeButton.classList.remove('enabled');
  }, 300);

  this.elTBeam.classList.add('beam');
  this.elGlass.classList.add('fade');

  setTimeout(() => {
    this.elTBeam.classList.remove('beam');

    /*if (this.orders.length > 0) {
      this.order = this.orders.shift();

      this.elAlien.classList.add('out');
      this.elAlien.classList.remove('in');

      setTimeout(() => {
        this.elAlien.classList.remove('out');
      }, 500);

      setTimeout(() => {
        this.elAlien.classList.add('in');
      }, 7600);
    } else {
      // no more orders
      this.order = { text: '' };
    }*/

    result();
  }, 1000);

  setTimeout(() => {
    this.elTBeam.classList.add('beam');
    this.elGlass.classList.remove('fade');

    setTimeout(() => {
      this.elTBeam.classList.remove('beam');
    }, 2500);
  }, 1500);
};

export default onServeButtonClick;
