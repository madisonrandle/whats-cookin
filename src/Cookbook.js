class Cookbook {
  constructor(recipeData, ingredientsData) {
    this.recipes = recipeData;
    this.ingredients = ingredientsData;
  }

  calculateCost(recipe) { 
    let costInDollars = recipe.ingredients.reduce((acc, specificIngredient) => {
      this.ingredients.forEach((ingredient) => {
        if (specificIngredient.id === ingredient.id) {
          acc += ingredient.estimatedCostInCents
        }
      })
      return acc;
    }, 0)
    costInDollars /= 100;
    return costInDollars.toLocaleString(undefined, { 
      style: "currency", 
      currency: "USD"
    })
  }
 

  findRecipe(searchTerm) {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => {
        let ingredientData = this.ingredients.find(element => element.id === ingredient.id);

        return (ingredientData.name.includes(searchTerm)) ||
        (recipe.name.includes(searchTerm))
      });
    })
  } 

}

if (typeof module !== 'undefined') {
  module.exports = Cookbook;
}

