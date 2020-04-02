const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User.js');
const usersData = require('../data/users.js');
const recipesData = require('../data/recipes.js');

let userData, user;

describe('User', () => {
  beforeEach(() => {
    userData = usersData[17];
    user = new User(userData);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of a cookbook', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('Should have a unique id', () => {
    expect(user.userData.id).to.equal(18);
  });

  it('Should have a unique name', () => {
    expect(user.userData.name).to.equal('Missouri Runolfsdottir');
  });

  it('Should have a pantry', () => {
    expect(user.userData.pantry).to.deep.equal([{'ingredient': 11282, 'amount': 2}, {'ingredient': 1123, 'amount': 2}]);
  });

  it('Should store a list of favorite recipes', () => {
    expect(user.favoriteRecipes).to.be.a('array');
    expect(user.favoriteRecipes).to.have.lengthOf(0);
  });

  it('Should add and remove objects from an array of favorite recipes', () => {
    user.addRecipeToFavorites(recipesData[0]);
    user.addRecipeToFavorites(recipesData[1]);

    expect(user.favoriteRecipes).to.deep.equal([recipesData[0], recipesData[1]]);

    user.removeRecipeFromFavorites(recipesData[0]);
    expect(user.favoriteRecipes).to.deep.equal([recipesData[1]]);
  });

  it('Should store a list of saved recipes', () => {
    expect(user.recipesToCook).to.be.a('array');
    expect(user.recipesToCook).to.have.lengthOf(0);
  });

  it('Should add and remove objects from an array of saved recipes', () => {
    user.saveRecipeToCook(recipesData[0]);
    user.saveRecipeToCook(recipesData[1]);

    expect(user.recipesToCook).to.deep.equal([recipesData[0], recipesData[1]]);

    user.removeRecipeToCook(recipesData[0]);
    expect(user.recipesToCook).to.deep.equal([recipesData[1]]);
  });

  it('Should be able to filter recipes by tag', () => {
    expect(user.filterFavoriteRecipes('snack')).to.be.a('array');
    expect(user.filterRecipesToCook('snack')).to.be.a('array');
  });

  it('Should be able to search for any saved recipes by name or ingredient', () => {
    user.addRecipeToFavorites(recipesData[0]);
    expect(user.findFavorites('Chocolate')).to.be.a('array');

    expect(user.findFavorites('Chocolate')).to.deep.equal([recipesData[0]]);
  });
  
});
