import Game from './components/Game';
import knote from './libs/knote';

let alertRepeater;

const sounds = {
  buttonPress(shift = 100) {
    //const shift = Math.random() * 600;

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

const game = new Game(sounds);

document.addEventListener('click', () => {
  /*setInterval(() => {

    knote.randomSlide(500, 800, 0.5, 0.4, 'triangle');
  }, 700);*/

  slideForever2()
  slideForever()
}, { once: true });

let ab = true;

document.addEventListener('click', () => {
  return false;
  const status = 'success';
  //const status = 'fail';

  if (status === 'fail') {
    //const waveType = 'sawtooth';
    //const waveType = 'triangle';

    const waveType = (ab) ?
      'sawtooth' :
      'triangle';

    knote.randomSlide(400, 300, 0.1, 0.4, waveType);

    setTimeout(() => {
      knote.randomSlide(300, 100, 0.2, 0.4, waveType);
    }, 140);

    ab = !ab;

    return;
  }

  knote.randomSlide(700, 800, 0.1, 0.4, 'triangle');

  setTimeout(() => {
    knote.randomSlide(800, 1300, 0.2, 0.4, 'triangle');
  }, 140);
}, { });

function slideForever() {
  knote.randomSlide();
  setTimeout(() => {
    slideForever()
  }, 900 + 500 * Math.random());

}

function slideForever2() {
  (Math.random() > 0.5 ) ?
    knote.randomSlide(400, 500, 2) :
    knote.randomSlide(300, 400, 2);

  setTimeout(() => {
    slideForever2()
  }, 2000);
}
