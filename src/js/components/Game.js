import dom from '../libs/dom';
import ProgressTracker from './ProgressTracker';
import orders from './orders';
import checkGlass from './checkGlass';
import addToGlass from './addToGlass';
import onIngredientClick from './onIngredientClick';
import onServeButtonClick from './onServeButtonClick';
import NavPanel from './NavPanel';

/* const ingredients = {
  'i-0': { color: 'green' },
  'i-1': { color: 'orange' },
  'i-2': { color: 'red' },
  'i-3': { color: 'blue' }
  'i-4': { color: 'purple' }
  'i-5': { color: 'silver' }
}; */

const ingredientColors = [
  'darkgreen',
  'orange',
  'red',
  'blue',
  'purple',
  'silver'
];

const mixes = [
  {
    in: [0, 1],
    out: 5
  },
  {
    in: [2, 3],
    out: 4
  }
];

const explodersV1 = [
  [4, 0],
  [4, 1],
  [5, 2],
  [5, 3]
];

// v2
const explodersV2 = [
  [4, 1],
  [4, 2],
  [5, 0],
  [5, 3]
];

// v3
const explodersV3 = [
  [4, 2],
  [4, 3],
  [5, 0],
  [5, 1]
];

// v4 (v2 + non-mix exploders)
const explodersV4 = [
  [4, 1],
  [4, 2],
  [5, 0],
  [5, 3],

  [0, 3],
  [1, 2]
];

const exploders = explodersV4;

class Game {
  constructor(sounds) {
    this.ingredientColors = ingredientColors;
    this.exploders = exploders;
    //this.orders = [...orders ];
    this.mixes = mixes;
    Object.assign(this, addToGlass);
    Object.assign(this, checkGlass);
    this.sounds = sounds;
    this.onIngredientClick = onIngredientClick;
    this.onServeButtonClick = onServeButtonClick;

    const elTitleScreen = dom.findOne('.title-screen-container');

    this.elTitleScreen = elTitleScreen;

    this.elAlien = dom.findOne('.alien');

    // Skip title
    if (false) {
      elTitleScreen.style.display = 'none';

      setTimeout(() => {
        this.elAlien.classList.add('in');
      }, 100);
    }

      /*dom.on(elTitleScreen, 'click', () => {
        dom.findOne('.mouth').classList.toggle('flipped');

        setTimeout(() => {

          dom.findOne('.explosion-minis').classList.toggle('boom');
          knote.brownNoise(0, 1400, 0.54);
          //knote.brownNoise(500, 700, 0.55);
          knote.brownNoise(0.3, 1400, 0.55);
          knote.brownNoise(0.5, 1400, 0.55);
          setTimeout(() => {
            //knote.brownNoise(0, 1500, 1);
          }, 500);
          setTimeout(() => {
            //knote.brownNoise(0, 1500, 1);
          }, 600);

          setTimeout(() => {

            dom.findOne('.explosion').classList.toggle('boom');
            //knote.brownNoise(0, 1900, 1);
            knote.brownNoise(0, 2900, 0.5);
          }, 1000);
        }, 500);

      });*/

    this.canClick = true;

    /*dom.on(elTitleScreen, 'touchend', () => {
      if (!this.canClick) return;

      if (elTitleScreen.requestFullscreen) {
        console.log('go full!');
        document.body.requestFullscreen();
      }
    }, { once: true });*/

    dom.onTap(elTitleScreen, () => {
      if (!this.canClick) return;

      elTitleScreen.classList.add('enter');

      setTimeout(() => {
        elTitleScreen.classList.add('hide');

        setTimeout(() => {
          this.navPanel.toggle();
        }, 1000);

        /*setTimeout(() => {
          this.elAlien.classList.add('in');
        }, 100);*/
      }, 4000);
    });

    // document.querySelector('.title-screen-container').addEventListener('click', event => event.currentTarget.classList.add('hide'));

    this.elIngredientsPanel = dom.findOne('.ingredients-panel');
    this.elIngredients = dom.find('.ingredient', this.elIngredientsPanel);
    this.elGlass = dom.findOne('.glass');
    this.elOrderPanel = dom.findOne('.order-panel');
    this.elServeButton = dom.findOne('.serve-button');
    this.elTBeam = dom.findOne('.t-beam');
    this.elAlertLight = dom.findOne('.alert-light');
    this.elTitleScreenExplosion = dom.findOne('.title-screen-container .explosion');
    this.elTitleScreenExplosionMinis = dom.findOne('.title-screen-container .explosion-minis');
    this.elExplosion = dom.findOne('.window .explosion');
    this.elExplosionMinis = dom.findOne('.window .explosion-minis');
    this.elExplosionTimer = dom.findOne('.explosion-timer');
    this.elDrinkTimer = dom.findOne('.drink-timer');
    this.elDrinkTimerAlert = dom.findOne('.drink-timer-alert');
    this.elGameOver = dom.findOne('.game-over');
    this.elMouth = dom.findOne('.mouth');
    this.elBarWrapWrap = dom.findOne('.bar-wrap-wrap');

    this.navPanel = new NavPanel(this);

    //this.order = this.orders.shift();
    this.glassContents = [];

    //const orderText = this.order.text.split('').sort(() => 0.5 - Math.random()).join('');

    //console.log(orderText, this.order.text);

    //this.elOrderPanel.innerHTML = `<div>${orderText}</div>`;
    this.liquidLevel = 0;

    dom.on(this.elIngredients, 'click', (event) => this.onIngredientClick(event));
    dom.on(this.elServeButton, 'click', (event) => this.onServeButtonClick(event));

    dom.on(this.elGameOver, 'click', (event) => {
      event.stopImmediatePropagation();

      // soft reset

      this.elTitleScreenExplosionMinis.classList.remove('boom');

      this.elMouth.classList.remove('flipped');
      this.elAlertLight.classList.remove('active');
      this.elExplosionTimer.classList.remove('count-down');
      this.elDrinkTimer.classList.remove('count-down');

      //this.orders = [...orders];
      //this.order = this.orders.shift();

      this.resetGlass();

      this.progressTracker = new ProgressTracker(this);

      setTimeout(() => {
        this.elTitleScreenExplosion.classList.remove('boom');
        this.elGameOver.classList.add('hide');

        setTimeout(() => {
          this.elTitleScreenExplosion.classList.remove('boom');
          this.elGameOver.classList.add('hidden');
        }, 500);
      }, 500);
    });
  }

  idToColor(id) {
    return ingredientColors[id];
  }
}

export default Game;
