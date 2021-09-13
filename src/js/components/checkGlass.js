function checkGlass() {
  let result;

  if (this.exploder) {
    if (this.boss && !this.navPanel.newSploder()) {
      return this.postResult();
    }

    return this.exploderResult();
  }

  if (this.boss) {
    return this.postResult();
  }

  console.log('check glass', this.glassContents, this.order.ingredients);

  // get counts
  const contentsCounts = this.glassContents.reduce((prev, current) => {
    if (prev[current]) {
      prev[current] += 1;
    } else {
      prev[current] = 1;
    }

    return prev;
  }, {});
  const orderCounts = this.order.ingredients.reduce((prev, current) => {
    if (prev[current]) {
      prev[current] += 1;
    } else {
      prev[current] = 1;
    }

    return prev;
  }, {});

  console.log(contentsCounts, orderCounts);

  if (
    this.order.ingredients.every(ingredient => this.glassContents.includes(ingredient)) &&
    Object.entries(orderCounts).every(entry => contentsCounts[entry[0]] >= entry[1])
  ) {
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

  setTimeout(() => {
    if (this.orders.length > 0) {
      this.order = this.orders.shift();

      this.elAlien.classList.add('out');
      this.elAlien.classList.remove('in');

      setTimeout(() => {
        this.elAlien.classList.remove('out');
      }, 800);

      setTimeout(() => {
        this.canClick = true;
        this.elIngredientsPanel.classList.remove('disabled');
        this.elAlien.classList.add('in');

        setTimeout(() => {
          this.elOrderPanel.innerHTML = `<div>${this.order.text}</div>`;

          this.elDrinkTimer.classList.add('count-down');
        }, 800);
      }, 900);
    } else {
      this.endRound();
    }
  }, 1500);

  return result;
}

function postResult() {
  this.canClick = false;
  setTimeout(() => {
    this.resetGlass();

    if (this.boss && !this.win) {
      this.canClick = true;
      this.elIngredientsPanel.classList.remove('disabled');
    }
  }, 1000);
}

function resetGlass() {
  console.log('reset glass');
  //if (!this.win) this.canClick = true;
  //this.elIngredientsPanel.classList.remove('disabled');
  this.elOrderPanel.innerHTML = '';
  this.elOrderPanel.style.backgroundColor = '#55506d';
  this.glassContents = [];
  this.elGlass.innerHTML = '<div class="base"></div>';
  this.liquidLevel = 0;
}

function cancelAlarm() {
  this.sounds.alertOff();
  this.alertOn = false;
  this.exploder = false;
  this.elAlertLight.classList.remove('active');
  this.elExplosionTimer.classList.remove('count-down');
}

function exploderResult() {
  this.alertOn = false;
  this.canClick = false;

  if (this.boss) {
    this.sounds.explode();

    setTimeout(() => {
      if (this.navPanel.bossHit()) {
        this.elExplosion.classList.add('boom');
        this.cancelAlarm();

        setTimeout(() => {
          this.elExplosion.classList.remove('boom');

          this.postResult();
        }, 500);
      }
    }, 500);

    return;
  }

  setTimeout(() => {
    this.cancelAlarm();

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
        this.canClick = true;
        this.elIngredientsPanel.classList.remove('disabled');
        this.elAlien.classList.add('in');

        setTimeout(() => {
          this.elOrderPanel.innerHTML = `<div>${this.order.text}</div>`;

          this.elDrinkTimer.classList.add('count-down');
        }, 800);
      }, 5600);
    } else {
      setTimeout(() => {
        this.endRound();
      }, 4000);
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

function endRound() {
  // no more orders
  this.order = { text: '' };

  this.navPanel.toggle();

  setTimeout(() => {
    const timeout = this.progressTracker.clearPips();

    setTimeout(() => {
      const completion = this.progressTracker.successfulOrders / this.progressTracker.totalOrders * 100;

      console.log('completion', completion);

      if (completion > this.navPanel.level.completion) {
        this.navPanel.level.completion = completion;
      }

      this.navPanel.update();
    }, timeout + 1000);
  }, 1500);
}

export default {
  checkGlass,
  exploderResult,
  postResult,
  resetGlass,
  cancelAlarm,
  endRound
}
