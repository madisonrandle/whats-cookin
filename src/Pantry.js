class Pantry extends Cookbook {
  constructor (ingredientsData, recipesData, userPantry) {
    super (ingredientsData, recipesData)
    this.userPantry = userPantry;
  }
}


if (typeof module !== 'undefined') {
  module.exports = Pantry;
}

// Pantry - canPantryCookSpecifiedMeal, determineIngredientSuppyForSpecificMeal