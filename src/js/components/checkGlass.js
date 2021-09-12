function checkGlass() {
  let result;

  if (this.alertOn) {
    return this.exploderResult();
  }

  console.log('check glass', this.glassContents, this.order.ingredients);

  if (this.order.ingredients.every(ingredient => this.glassContents.includes(ingredient))) {
    console.log('match');

    result = () => {
      this.elOrderPanel.style.backgroundColor = 'green'; // Success green
      this.sounds.success();
      this.progressTracker.addPip(true);

      this.postResult();
    };
  } else {
    console.log('nomatch');

    result = () => {
      this.elOrderPanel.style.backgroundColor = '#ab3535'; // Error red
      this.sounds.error();
      this.progressTracker.addPip(false);

      this.postResult();
    };
  }

  if (this.orders.length > 0) {
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
  }

  return result;
}

function postResult() {
  setTimeout(() => {
    this.resetGlass();
  }, 1000);
}

function resetGlass() {
  this.elOrderPanel.innerHTML = `<div>${this.order.text}</div>`;
  this.elOrderPanel.style.backgroundColor = '#55506d';
  this.glassContents = [];
  this.elGlass.innerHTML = '<div class="base"></div>';
  this.liquidLevel = 0;
}

function cancelAlarm() {
  this.sounds.alertOff();
  this.alertOn = false;
  this.elAlertLight.classList.remove('active');
  this.elExplosionTimer.classList.remove('count-down');
}

function exploderResult() {
  setTimeout(() => {
    this.cancelAlarm();

    this.elExplosionTimer.classList.remove('count-down');
    this.elExplosionMinis.classList.add('boom');
    this.sounds.explode();

    setTimeout(() => {
      this.elExplosion.classList.add('boom');
    }, 700);

    setTimeout(() => {
      this.elExplosionMinis.classList.remove('boom');
    }, 1700);

    setTimeout(() => {
      this.elExplosion.classList.remove('boom');
    }, 3000);

    console.log('nomatch - exploder!!!');
  }, 2000);

  return () => {
    this.elOrderPanel.style.backgroundColor = '#ab3535'; // Error red
    this.sounds.error();
    this.progressTracker.addPip(false);

    this.postResult();

    if (this.orders.length > 0) {
      this.order = this.orders.shift();

      setTimeout(() => {
        this.elAlien.classList.add('in');
      }, 5600);
    } else {
      // no more orders
      this.order = { text: '' };
    }

    setTimeout(() => {
      this.elAlien.classList.add('out');
      this.elAlien.classList.remove('in');

      setTimeout(() => {
        this.elAlien.classList.remove('out');
      }, 500);
    }, 3000);
  };
}

export default {
  checkGlass,
  exploderResult,
  postResult,
  resetGlass,
  cancelAlarm
}
