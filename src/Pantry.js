class Pantry {
  constructor(userPantry, ingredientsData) {
    this.pantry = userPantry;
    this.ingredientsData = ingredientsData;
  }

  canUserPantryCookSelectedMeal(recipe) {
    let response = {
      success: true,
      missing: []
    };
    
    recipe.ingredients.forEach(recipeIngredient=> {
      let userIngredient = this.pantry.find(i => recipeIngredient.id === i.ingredient);

      if (!userIngredient) {
        response.success = false;
        response.missing.push({
          id: recipeIngredient.id,
          name: this.getIngredientNameById(recipeIngredient.id),
          amount: recipeIngredient.quantity.amount,
          unit: recipeIngredient.quantity.unit,
          cost: (recipeIngredient.quantity.amount * this.getIngredientCostById(recipeIngredient.id)) / 100
        });

      } else if (userIngredient.amount < recipeIngredient.quantity.amount) {
        response.success = false;
        response.missing.push({
          id: recipeIngredient.id,
          name: this.getIngredientNameById(recipeIngredient.id),
          amount: recipeIngredient.quantity.amount - userIngredient.amount,
          unit: recipeIngredient.quantity.unit,
          cost: ((recipeIngredient.quantity.amount - userIngredient.amount) * this.getIngredientCostById(recipeIngredient.id)) / 100
        });
      }
    });
    return response;
  }

  getIngredientNameById(id) {
    let i = this.ingredientsData.find(name => name.id === id);
    return (!i) ? '' : i.name;
  }

  getIngredientCostById(id) {
    let i = this.ingredientsData.find(cost => cost.id === id);
    return (!i) ? '' : i.estimatedCostInCents;
  }
}


if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
