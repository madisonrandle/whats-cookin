// import {expect} from 'chai';
const chai = require('chai');
const expect = chai.expect;

import recipeData from '../data/recipes.js';
import ingredientData from '../data/ingredients.js';
import Cookbook from '../src/Cookbook.js'

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
      expect(cookbook.ingredientData).to.be.an('array');
    });

    it('should have an ID for each ingredient', () => {
      expect(cookbook.ingredientData[0].id).to.equal()
    });

    it('should have an estimated cost in cents for each ingredient', () => {
      expect(cookbook.ingredientData[0].estimatedCostInCents).to.equal();
    });

    it('should have a name for each ingredient', () => {
      expect(cookbook.ingredientData[0].name).to.equal()
    });
  })

  //cookbook.recipeData
  describe('cookbook.recipeData', () => {
    
    it('should have an array of all recipes', () => {
      expect(cookbook.recipeData).to.be.an('array');
    });

    it('should have a name for each recipe', () => {
      expect(cookbook.recipeData[0].name).to.equal();
    })

    it('should have an image for each recipe', () => {
      expect(cookbook.recipeData[0].image).to.equal();
    });

    it('should have a list of ingredients from each recipe', () => {
      expect(cookbook.recipeData[0].ingredients.length).to.equal()
    });

    it('should have a list of instructions from each recipe', () => {
      expect(cookbook.recipeData[0].instructions.length).to.equal();
    });

    it('should have a list of tags for each recipe', () => {
      expect(cookbook.recipeData[0].tags).to.equal();
    });
  })
  describe('Cookbook Methods', () => {
    it('should have an array of all ingredients', () => {
      expect(cookbook.ingredientData).to.be.an('array');
    });

    it('should have an ID for each ingredient', () => {
      expect(cookbook.ingredientData[0].id).to.equal()
    });

    it('should have an estimated cost in cents for each ingredient', () => {
      expect(cookbook.ingredientData[0].estimatedCostInCents).to.equal();
    });

    it('should have a name for each ingredient', () => {
      expect(cookbook.ingredientData[0].name).to.equal()
    });
  })

})



// Cookbook - calculateCost and findRecipe
