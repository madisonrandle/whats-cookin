class User {
  constructor (userData, favoriteRecipes) {
    this.userData = userData;
    this.favoriteRecipes = [];
  }

  addRecipeToFavorites(recipe) {
    !this.favoriteRecipes.includes(recipe) && this.favoriteRecipes.push(recipe);
  }

  removeRecipeFromFavorites(recipe) {
    const i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1)
  }

}

if (typeof module !== 'undefined') {
  module.exports = User;
}
// User - add/RemoveToFavorites, add/RemoveToCook, filter/findFavoriteRecipes
