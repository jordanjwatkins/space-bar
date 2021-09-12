import dom from '../libs/dom';
import { level1 } from './orders';
import ProgressTracker from './ProgressTracker';

const levels = [
  {
    orders: level1, className: 'planet-1'
  },
  { orders: level1, className: 'planet-2' },
  { orders: level1 }
];

class NavPanel {
  constructor(game) {
    this.game = game;
    this.el = dom.findOne('.nav-panel');
    this.elScrim = dom.findOne('.scrim');

    this.el.appendChild(dom.make(this.game.elBarWrapWrap.outerHTML));

    levels.forEach((level, index) => {
      this.addLevel(level, index);
    });
  }

  toggle() {
    this.el.classList.toggle('hide');
    this.elScrim.classList.toggle('hide');
  }

  addLevel(level, index) {
    const elLevel = dom.make(`<div class="level level-${index}"><div class="marker"></div><div class="planet"></div></div>`);

    this.el.appendChild(elLevel);

    dom.on(elLevel, 'click', () => {
      this.startLevel(level);
    }, { once: true });
  }

  startLevel(level) {
    // Start level
    this.game.orders = [...level.orders].sort(() => 0.5 - Math.random());

    this.game.order = this.game.orders.shift();

    const orderText = this.game.order.text.split('').sort(() => 0.5 - Math.random()).join('');

    this.game.elOrderPanel.innerHTML = `<div>${orderText}</div>`;

    this.toggle();

    this.game.progressTracker = new ProgressTracker(this.game);

    setTimeout(() => {
      this.game.elAlien.classList.add('in');
    }, 100);
  }
}

export default NavPanel;
