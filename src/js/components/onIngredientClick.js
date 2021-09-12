function onIngredientClick(event) {
  if (this.liquidLevel > 3) return;

  const elIngredient = event.target;
  const color = this.ingredientColors[Number(elIngredient.dataset.id)];

  console.log('elIngredient', elIngredient.className, color);

  elIngredient.style.backgroundColor = color;

  this.sounds.buttonPress();

  setTimeout(() => {
    elIngredient.style.backgroundColor = null;
  }, 300);

  this.addToGlass(Number(elIngredient.dataset.id), color);

  this.elServeButton.classList.add('enabled');

  this.liquidLevel += 1;

  console.log(this.liquidLevel);
};

export default onIngredientClick;
