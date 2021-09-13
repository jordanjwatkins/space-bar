import dom from '../libs/dom';
import { level1, level2, level3, level4 } from './orders';
import ProgressTracker from './ProgressTracker';

const levels = [
  {
    orders: level1, className: 'planet-1', completion: 0, posX: '13%'
  },
  { orders: level2, className: 'planet-2', unlockPoint: 18.75, completion: 0, posX: '37%' },
  { orders: level3, unlockPoint: 37, completion: 0, posX: '62%' },
  { orders: level4, unlockPoint: 60, completion: 0, posX: '87%' }
];

class NavPanel {
  constructor(game) {
    this.game = game;
    this.el = dom.findOne('.nav-panel');
    this.elScrim = dom.findOne('.scrim');
    this.elTotalProgress = dom.findOne('.total-progress');
    this.totalProgress = 0;
    this.elBar = dom.make(this.game.elBarWrapWrap.outerHTML);
    this.elBoss = dom.findOne('.boss');
    this.elWBoss = dom.make(this.elBoss.outerHTML);
    this.game.elWindow.appendChild(this.elWBoss);
    this.usedExploders = [];

    this.bossDamage = 0;

    this.el.appendChild(this.elBar);

    levels.forEach((level, index) => {
      this.addLevel(level, index);
    });

    this.elTotalProgress.appendChild(dom.make(`<div class="milestone" style="left: 80%"></div>`));

    this.update();

    dom.onTap(this.elBoss, () => {
      this.game.exploder = false;
      this.game.canClick = true;
      this.game.elIngredientsPanel.classList.remove('disabled');
      this.game.elAlien.classList.add('out');
      this.elBar.style.left = '87%';

      setTimeout(() => {
        this.toggle();

        setTimeout(() => {
          this.game.boss = true;

          this.bossAttack();
        }, 2000);
      }, 800);
    });
  }

  bossAttack() {
    if (!this.game.alertOn) this.game.sounds.alert();
    this.game.alertOn = true;
    this.elWBoss.classList.add('in', 'attack');
    this.game.canClick = true;
    this.game.elIngredientsPanel.classList.remove('disabled');

    this.game.elAlertLight.classList.add('active');
    this.game.elExplosionTimer.classList.add('count-down');

    this.gameOverTimeout = setTimeout(() => {
      console.log('game over splode');
      if (this.game.alertOn) {
        dom.findOne('.laser-scrim').classList.add('fire');

        setTimeout(() => {
          dom.findOne('.laser-scrim').classList.remove('fire');
          this.elWBoss.classList.remove('in', 'attack', 'd1', 'd2', 'd3');
          this.usedExploders = [];
          this.bossDamage = 0;
          this.game.canClick = false;
          this.game.explode();
        }, 500);
      }
    }, 6000);
  }

  newSploder() {
    if (this.bossDamage === 0) {
      this.usedExploders.push(this.game.glassContents);

      return true;
    } else {
      let newExploder = false;

      this.usedExploders.forEach(exploder => {

        if (exploder.every(ingredient => this.game.glassContents.includes(ingredient))) {
          console.log('old sploder');

        } else {
          console.log('new sploder');

          newExploder = true;
        }
      })

      return newExploder;
    }
  }

  bossHit() {
    this.bossDamage++;

    setTimeout(() => {
      this.elWBoss.classList.add('d' + this.bossDamage);
    }, 200);

    if (this.bossDamage < 3) {
      this.elWBoss.classList.remove('attack');
      clearTimeout(this.gameOverTimeout);

      setTimeout(() => {
        this.bossAttack();
      }, 2000);
    } else {
      this.game.canClick = false;
      this.game.win = true;

      setTimeout(() => {
        this.game.sounds.win();

        setTimeout(() => {
          this.game.elTitleScreen.classList.remove('hide', 'enter');

          setTimeout(() => {
            this.game.elTitleScreen.classList.add('exit');
          }, 2000);
        }, 2000);
      }, 2000);
    }

    return true;
  }

  toggle() {
    this.el.classList.toggle('hide');
    this.elScrim.classList.toggle('hide');
  }

  addLevel(level, index) {
    const elLevel = dom.make(`<div class="level level-${index}"><div class="marker"></div><div class="planet"></div></div>`);

    this.el.appendChild(elLevel);

    level.el = elLevel;

    if (index !== 0) {
      elLevel.classList.add('locked');

      this.elTotalProgress.appendChild(dom.make(`<div class="milestone" style="left: ${level.unlockPoint + index}%"></div>`));
    }

    dom.onTap(elLevel, (event) => {
      if (elLevel.classList.contains('locked')) {
        this.game.sounds.error();
      } else {
        setTimeout(() => {
          this.elBar.style.left = level.posX;

          setTimeout(() => {
            this.level = level;
            this.startLevel(level);
          }, 1000);
        }, 800);

        this.game.sounds.success();
      }

      elLevel.classList.add('blink');

      setTimeout(() => {
        elLevel.classList.remove('blink');
      }, 800);
    });
  }

  startLevel(level) {
    this.game.boss = false;
    console.log('start level');
    // Start level
    this.game.orders = [...level.orders].sort(() => 0.5 - Math.random());
    console.log('start level', this.game.orders);
    this.toggle();

    this.game.progressTracker = new ProgressTracker(this.game);

    this.game.order = this.game.orders.shift();

    const orderText = this.game.order.text.split('').sort(() => 0.5 - Math.random()).join('');

    setTimeout(() => {
      this.game.elOrderPanel.innerHTML = `<div>${orderText}</div>`;
      this.game.canClick = true;
      this.game.elIngredientsPanel.classList.remove('disabled');
      this.game.elAlien.classList.add('in');

      this.game.elDrinkTimer.classList.add('count-down');
    }, 100);
  }

  update() {
    this.totalProgress = 0;

    this.elTotalProgress.style.setProperty('--total-progress', '0%');

    levels.forEach((level) => {
      if (level.completion) this.totalProgress += level.completion / levels.length;
    });

    setTimeout(() => {
      this.elTotalProgress.style.setProperty('--total-progress', this.totalProgress + '%');

      setTimeout(() => {
        levels.forEach((level) => {
          if (!level.unlocked && level.unlockPoint && this.totalProgress >= level.unlockPoint) {
            console.log('unlock level', level, this.totalProgress);
            level.el.classList.add('blink');

            setTimeout(() => {
              level.el.classList.remove('blink');
              level.el.classList.remove('locked');
              this.game.sounds.success();
            }, 800);

            level.unlocked = true;
          }
        });

        if (this.totalProgress > 80) {
          this.elBoss.classList.add('unlocked');
        }
      }, 1000);
    }, 1000);
  }
}

export default NavPanel;
