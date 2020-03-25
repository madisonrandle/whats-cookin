class User {
  constructor (userData, favoriteRecipes) {
    this.userData = userData;
    this.favoriteRecipes = [];
  }

  // add to / remove from the user’s favoriteRecipes
  addToFavorites(recipe) {
    !this.favoriteRecipes.includes(recipe) && this.favoriteRecipes.push(recipe);
  }


}

if (typeof module !== 'undefined') {
  module.exports = User;
}
// User - add/RemoveToFavorites, add/RemoveToCook, filter/findFavoriteRecipes
