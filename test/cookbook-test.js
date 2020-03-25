const chai = require('chai');
const expect = chai.expect;

const Cookbook = require('../src/Cookbook.js');

const recipeData = require('../data/recipes.js');
console.log('recipeData', recipeData);

const ingredientData = require('../data/ingredients.js');
console.log('ingredientData', ingredientData)

let cookbook;

describe('Cookbhook', () => {
  beforeEach(() => {
    cookbook = new Cookbook(recipeData, ingredientData);
  });

  it('should be a function', () => {
    expect(Cookbook).to.be.a('function');
  });

  it('should be an instance of a cookbook', () => {
    expect(cookbook).to.be.an.instanceof(Cookbook);
  });

  //cookbook.ingredientData
  describe('cookbook.ingredientData', () => {
    
    it('should have an array of all ingredients', () => {
      console.log(cookbook)
      expect(cookbook.ingredientData).to.be.an('array');
    });

    it.skip('should have an ID for each ingredient', () => {
      expect(cookbook.ingredientData[0].id).to.equal()
    });

    it.skip('should have an estimated cost in cents for each ingredient', () => {
      expect(cookbook.ingredientData[0].estimatedCostInCents).to.equal();
    });

    it.skip('should have a name for each ingredient', () => {
      expect(cookbook.ingredientData[0].name).to.equal()
    });
  })

  //cookbook.recipeData
  describe('cookbook.recipeData', () => {
    
    it.skip('should have an array of all recipes', () => {
      expect(cookbook.recipeData).to.be.an('array');
    });

    it.skip('should have a name for each recipe', () => {
      expect(cookbook.recipeData[0].name).to.equal();
    })

    it.skip('should have an image for each recipe', () => {
      expect(cookbook.recipeData[0].image).to.equal();
    });

    it.skip('should have a list of ingredients from each recipe', () => {
      expect(cookbook.recipeData[0].ingredients.length).to.equal()
    });

    it.skip('should have a list of instructions from each recipe', () => {
      expect(cookbook.recipeData[0].instructions.length).to.equal();
    });

    it.skip('should have a list of tags for each recipe', () => {
      expect(cookbook.recipeData[0].tags).to.equal();
    });
  })
  describe('Cookbook Methods', () => {

    it.skip('should be able to filter through the array by ingredients', () => {
      expect(cookbook.findRecipe('ingredient')).to.equal();
    });

    it.skip('should be able to filter through the array by name', () => {
      expect(cookbook.findRecipe('title').length).to.equal(1);
    });

    it.skip('should be able to calculate the cost for an ingredient', () => {
      expect(cookbook.calculateCost(recipeData)).to.equal('$amount')
    })

   
  });
})



// Cookbook - calculateCost and findRecipe
