import dom from '../libs/dom';

export default {
  addToGlass(id, color) {
    this.canClick = false;
    this.elIngredientsPanel.classList.add('disabled');

    const newIngredient = id;
    const prevIngredient = this.glassContents[this.glassContents.length - 1];

    console.log(prevIngredient, newIngredient);

    const elIngredient = dom.make(`<div class="p${this.liquidLevel}" style="background: ${color}; box-shadow: 0 0 17px 4px ${color}"></div>`);

    this.elGlass.appendChild(elIngredient);

    setTimeout(() => {
      elIngredient.classList.add('pour');
      this.sounds.drinkPour();
    }, 100);

    // First ingredient - just add it
    if (prevIngredient === undefined) {
      this.glassContents.push(newIngredient);

      setTimeout(() => {
        this.canClick = true;
        this.elIngredientsPanel.classList.remove('disabled');
      }, 300);

      return;
    }

    // See if we have a mix
    const mixOut = this.tryMix(newIngredient, prevIngredient);

    if (mixOut !== false) {
      // Mix the mix
      this.mix(mixOut);
    } else {
      // No mix - add the new ingredient
      this.glassContents.push(newIngredient);

      setTimeout(() => {
        this.canClick = true;
        this.elIngredientsPanel.classList.remove('disabled');
      }, 500);
    }

    // See if we have an exploder
    this.exploders.some((exploder) => {
      console.log('exploder check', newIngredient, prevIngredient, exploder);
      if (
        (newIngredient === exploder[0] && prevIngredient === exploder[1]) ||
        (newIngredient === exploder[1] && prevIngredient === exploder[0])
      ) {
        console.log('explosive!!!');
        if (!this.alertOn) this.sounds.alert();
        this.alertOn = true;
        this.exploder = true;

        this.elAlertLight.classList.add('active');
        this.elExplosionTimer.classList.add('count-down');

        setTimeout(() => {
          if (this.alertOn && !this.boss) {
            this.canClick = false;
            this.explode();
          }
        }, 4000);

        return true;
      }

      return false;
    });
  },

  explode() {
    this.barExploding = true;
    console.log('bar explode');

    this.elTitleScreen.classList.remove('hide', 'enter');
    this.sounds.alertOff();
    this.alertOn = false;

    setTimeout(() => {
      this.elMouth.classList.add('flipped');

      setTimeout(() => {
        this.sounds.explode();

        this.elTitleScreenExplosionMinis.classList.add('boom');

        setTimeout(() => {
          this.elTitleScreenExplosion.classList.add('boom');

          setTimeout(() => {
            this.elGameOver.classList.remove('hide', 'hidden');
            this.canClick = true;
            this.elIngredientsPanel.classList.remove('disabled');
          }, 3000);
        }, 1000);
      }, 500);
    }, 1000);
  },

  tryMix(newIngredient, prevIngredient) {
    let out;

    // Doubles stack instead of mixing
    if (newIngredient === prevIngredient) {
      out = newIngredient;

      return out;
    }

    this.mixes.some((mix) => {
      if (mix.in.includes(newIngredient) && mix.in.includes(prevIngredient)) {
        ({ out } = mix);

        return true;
      }

      return false;
    });

    return out || false;
  },

  mix(mixOut) {
    this.glassContents.pop();
    this.glassContents.push(mixOut);

    console.log('post mix content', this.glassContents);

    const color = this.idToColor(mixOut);

    console.log('mix2!!', color);

    const elMix = dom.make(`<div style="background: ${color}; box-shadow: 0 0 17px 4px ${color}" class="x2 p${this.liquidLevel - 1} over"></div>`);

    setTimeout(() => {
      this.elGlass.appendChild(elMix);

      if (this.elGlass.children[this.elGlass.children.length - 3].classList.contains('x2')) {
        elMix.classList.add('x3', `p${this.liquidLevel - 3}`);
      }

      if (this.elGlass.children[this.elGlass.children.length - 3].classList.contains('x3')) {
        elMix.classList.add('x4', 'p0');
      }

      setTimeout(() => {
        elMix.classList.add('mixing');
        this.elGlass.children[this.elGlass.children.length - 2].classList.add('fade');
        this.elGlass.children[this.elGlass.children.length - 3].classList.add('fade');
        //this.cancelAlarm();

        setTimeout(() => {
          this.canClick = true;
          this.elIngredientsPanel.classList.remove('disabled');
        }, 300);
      }, 100);
    }, 500);
  }

};
