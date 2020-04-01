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
    return this.favoriteRecipes.filter(recipe => recipe.tags.includes(recipeTag));
  }

  filterRecipesToCook(recipeTag) {
    return this.recipesToCook.filter(recipe => recipe.tags.includes(recipeTag));
  }

  //change test potentially
  findFavorites(searchContent) {
    let ingredientSearch = ingredientsData.reduce((acc, ingredient) => {
      this.favoriteRecipes.forEach(recipe => {
        recipe.ingredients.forEach(recipeIngredient => {
          if (recipeIngredient.id === ingredient.id && !acc.includes(ingredient.name)) {
            acc.push(ingredient.name);
          }
        });
      });
      return acc;
    }, []);

    return this.favoriteRecipes.reduce((acc, recipe) => {
      if (recipe.name.toLowerCase().includes(searchContent) || ingredientSearch.includes(searchContent) && !acc.includes(recipe)) {
        acc.push(recipe)
      }
      return acc;
    }, []);



  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
