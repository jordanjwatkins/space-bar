import Game from './components/Game';
import dom from './libs/dom';
import knote from './libs/knote';

let alertRepeater;

const sounds = {
  win() {
    knote.randomSlide(700, 800, 0.2, 0.4, 'triangle');

    setTimeout(() => {
      // knote.randomSlide(750, 850, 0.2, 0.4, 'triangle');
      knote.randomSlide(950, 1050, 0.2, 0.4, 'triangle');

      setTimeout(() => {
        knote.randomSlide(650, 750, 0.3, 0.4, 'triangle');

        setTimeout(() => {
          // knote.randomSlide(950, 1050, 0.2, 0.4, 'triangle');
          knote.randomSlide(1150, 1250, 0.3, 0.4, 'triangle');

          setTimeout(() => {
            knote.randomSlide(1450, 1450, 0.8, 0.4, 'triangle');
          }, 340);
        }, 240);
      }, 280);
    }, 240);
  },

  buttonPress(shift = 100) {
    // const shift = Math.random() * 600;

    knote.randomSlide(700 + shift, 790 + shift, 0.2, 0.4, 'triangle');
  },

  drinkPour() {
    knote.brownNoise(0, 400, 0.1);
  },

  explode() {
    knote.brownNoise(0, 1400, 0.54);
    knote.brownNoise(0.3, 1400, 0.55);
    knote.brownNoise(0.5, 1400, 0.55);

    knote.brownNoise(1.5, 2900, 0.5);
  },

  alert() {
    knote.randomSlide(500, 800, 0.5, 0.4, 'triangle');

    alertRepeater = setInterval(() => {
      knote.randomSlide(500, 800, 0.5, 0.4, 'triangle');
    }, 700);
  },

  alertOff() {
    clearInterval(alertRepeater);
  },

  error() {
    const waveType = 'triangle';

    knote.randomSlide(400, 300, 0.1, 0.4, waveType);

    setTimeout(() => {
      knote.randomSlide(300, 100, 0.2, 0.4, waveType);
    }, 140);
  },

  success() {
    knote.randomSlide(700, 800, 0.1, 0.4, 'triangle');

    setTimeout(() => {
      knote.randomSlide(800, 1300, 0.2, 0.4, 'triangle');
    }, 140);
  }
};

const game = new Game(sounds); // eslint-disable-line

dom.onTap(dom.findOne('.app-container'), () => {
  // console.log('start background sound');
  // sounds.win()
  /* setInterval(() => {

    knote.randomSlide(500, 800, 0.5, 0.4, 'triangle');
  }, 700); */

  slideForever2();
  slideForever();
}, { once: true });

// const ab = true;

/* document.addEventListener('click', () => false,
 const status = 'success';
  // const status = 'fail';

  if (status === 'fail') {
    // const waveType = 'sawtooth';
    // const waveType = 'triangle';

    const waveType = (ab) ?
      'sawtooth' :
      'triangle';

    knote.randomSlide(400, 300, 0.1, 0.4, waveType);

    setTimeout(() => {
      knote.randomSlide(300, 100, 0.2, 0.4, waveType);
    }, 140);

    ab = !ab;
  }

  knote.randomSlide(700, 800, 0.1, 0.4, 'triangle');

  setTimeout(() => {
    knote.randomSlide(800, 1300, 0.2, 0.4, 'triangle');
  }, 140);
  {}); */

function slideForever() {
  knote.randomSlide();
  setTimeout(() => {
    slideForever();
  }, 900 + 500 * Math.random());
}

function slideForever2() {
  if (Math.random() > 0.5) {
    knote.randomSlide(400, 500, 2);
  } else {
    knote.randomSlide(300, 400, 2);
  }

  setTimeout(() => {
    slideForever2();
  }, 2000);
}
