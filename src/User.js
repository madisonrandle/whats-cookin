class User extends Cookbook {
  constructor (ingredientsData, recipesData, userData) {super (ingredientsData, recipesData)
    this.userData = userData;
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
// User - add/RemoveToFavorites, add/RemoveToCook, filter/findFavoriteRecipes
