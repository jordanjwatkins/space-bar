import dom from '../libs/dom';

class ProgressTracker {
  constructor(game) {
    this.game = game;
    this.el = dom.findOne('.progress-tracker');
    this.el.innerHTML = '';
    this.totalOrders = this.game.orders.length;
    this.completedOrders = 0;
    this.successfulOrders = 0;
    this.failedOrders = 0;

    console.log('total orders', this.totalOrders, 100 / this.totalOrders);
  }

  addPipPlaceholders() {

  }

  addPip(success = true) {
    const pipType = (success) ? 'success' : 'fail';

    this.completedOrders += 1;

    if (success) {
      this.successfulOrders += 1;
    } else {
      this.failedOrders += 1;
    }

    this.el.appendChild(dom.make(`<div class="pip ${pipType}" style="width: ${100 / this.totalOrders}%"></div>`));
  }

  clearPips() {
    console.log('clear pips', this.el.children);
    dom.each(this.el.children, (child, index) => {
      console.log('clear pip');
      setTimeout(() => {
        if (child.classList.contains('success')) {
          this.game.sounds.buttonPress(900);
        } else {
          this.game.sounds.buttonPress(-900);
        }
        child.remove();
      }, index * 500);
    });

    return this.el.children.length * 500;
  }
}

export default ProgressTracker;
