class Cookbook {
  constructor(recipeData, ingredientData) {
    this.recipes = recipeData;
    this.ingredients = ingredientData;
  }
  
}

if (typeof module !== 'undefined') {
  module.exports = Cookbook;
}


// Cookbook - calculateCost and findRecipe
