const chai = require('chai');
const expect = chai.expect;

const recipeData = require('../data/recipes.js');
const ingredientsData = require('../data/ingredients.js');
const usersData = require('../data/users.js');
const Pantry = require('../src/Pantry.js')

let pantry;

describe.only('Pantry', () => {

  beforeEach(() => {
    pantry = new Pantry(usersData[0].pantry, ingredientsData);
  });
  
  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of a pantry', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should have a list of ingredients from the user pantry', () => {
    expect(usersData[0].pantry.length).to.equal(36);
  });

  it('should have a list of all ingredients', () => {
    expect(ingredientsData).to.be.a('array');
  });

  it('should know that there are enough ingredients in the user pantry to cook a specific recipe', () => {
    let recipe1 = recipeData[50];

    let response = pantry.canUserPantryCookSelectedMeal(recipe1);
    expect(response.success).to.equal(true);
  });

  it('should show the missing ingredient and amount required to make the specific recipe', () => {
    let recipe1 = recipeData[0];
    console.log(pantry.canUserPantryCookSelectedMeal(recipe1))
    let response = pantry.canUserPantryCookSelectedMeal(recipe1);
    expect(response).to.deep.equal({
      success: false,
      missing: [
        { id: 19206, name: 'instant vanilla pudding', amount: 1, unit: 'Tbsp', cost: 6.6 },
        { id: 19334, name: 'brown sugar', amount: 0.5, unit: 'c', cost: 56 },
        { id: 1012047, name: 'fine sea salt', amount: 24, unit: 'servings', cost: 56 },
        { id: 10019903, name: 'semi sweet chips', amount: 2, unit: 'c', cost: '' }
      ]
    });

  });
})