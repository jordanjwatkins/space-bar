import dom from '../libs/dom';

class ProgressTracker {
  constructor(game) {
    this.game = game;
    this.el = dom.findOne('.progress-tracker');
    this.el.innerHTML = '';
    this.totalOrders = this.game.orders.length;
    this.completedOrders = this.game.orders.length;
    this.successfulOrders = 0;
    this.failedOrders = 0;
  }

  addPipPlaceholders() {

  }

  addPip(success = true) {
    const pipColor = (success) ? 'green' : 'red';

    this.completedOrders += 1;

    if (success) {
      this.successfulOrders += 1;
    } else {
      this.failedOrders += 1;
    }

    this.el.appendChild(dom.make(`<div class="pip" style="background-color:${pipColor};"></div>`));
  }
}

export default ProgressTracker;
