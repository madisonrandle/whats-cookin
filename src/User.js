class User {
  constructor (userData, favoriteRecipes, recipesToCook) {
    this.userData = userData;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addRecipeToFavorites(recipe) {
    !this.favoriteRecipes.includes(recipe) && this.favoriteRecipes.push(recipe);
  }

  removeRecipeFromFavorites(recipe) {
    const i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1)
  }

  saveRecipeToCook(recipe) {
    !this.recipesToCook.includes(recipe) && this.recipesToCook.push(recipe);
  }

  removeRecipeToCook(recipe) {
    const i = this.recipesToCook.indexOf(recipe);
    this.recipesToCook.splice(i, 1)
  }

  filterFavoriteRecipes(recipeTag) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(recipeTag);
    });
  }

  filterRecipesToCook(recipeTag) {
    return this.recipesToCook.filter(recipe => {
      return recipe.tags.includes(recipeTag);
    });
  }

  findFavorites(searchContent) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(searchContent)
      || recipe.ingredients.find(ingredient => {
        return ingredient.name.includes(searchContent)
        });
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
