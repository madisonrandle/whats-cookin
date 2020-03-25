const chai = require('chai');
const expect = chai.expect;

const Cookbook = require('../src/Cookbook.js');

const recipeData = require('../data/recipes.js');
// console.log('recipeData', recipeData);

const ingredientsData = require('../data/ingredients.js');
// console.log('ingredientData', ingredientData)

let cookbook;

describe('Cookbook', () => {
  
  beforeEach(() => {
    cookbook = new Cookbook(recipeData, ingredientsData);
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
      // console.log(cookbook)
      expect(cookbook.ingredients).to.be.a('array');
    });

    it('should have an ID for each ingredient', () => {
      expect(cookbook.ingredients[0].id).to.equal(20081)
    });

    it('should have an estimated cost in cents for each ingredient', () => {
      expect(cookbook.ingredients[0].estimatedCostInCents).to.equal(142);
    });

    it('should have a name for each ingredient', () => {
      expect(cookbook.ingredients[0].name).to.equal('wheat flour')
    });
  })

  //cookbook.recipeData
  describe('cookbook.recipeData', () => {
    
    it('should have an array of all recipes', () => {
      expect(cookbook.recipes).to.be.a('array');
    });

    it('should have a name for each recipe', () => {
      expect(cookbook.recipes[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
    })

    it('should have an image for each recipe', () => {
      expect(cookbook.recipes[0].image).to.equal('https://spoonacular.com/recipeImages/595736-556x370.jpg');
    });

    it('should have a list of ingredients from each recipe', () => {
      expect(cookbook.recipes[0].ingredients.length).to.equal(11);
    });

    it('should have a list of instructions from each recipe', () => {
      expect(cookbook.recipes[0].instructions.length).to.equal(6);
    });

    it('should have a list of tags for each recipe', () => {
      expect(cookbook.recipes[0].tags).to.deep.equal([
        'antipasti',
        'starter',
        'snack',
        'appetizer',
        'antipasto',
        "hor d'oeuvre"
      ]);
    });
  })
  describe('Cookbook Methods', () => {

    it('should be able to find a recipe by name', () => {
      let searchedRecipe = cookbook.findRecipe('Loaded');
      expect(searchedRecipe.length).to.equal(1);
      expect(searchedRecipe[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
    });

    it('should be able to find recipe by ingredients', () => {
      let searchedRecipe = cookbook.findRecipe('celery');
      expect(searchedRecipe.length).to.equal(2);
      expect(searchedRecipe[0].name).to.equal('Easy Creamy Potato Salad with Yogurt');
      expect(searchedRecipe[1].name).to.equal('Curried Strawberry Chicken Salad');
    });

    it('should be able to calculate the cost for an ingredient', () => {
      const cookbook = new Cookbook(recipeData[0], ingredientsData);
      expect(cookbook.calculateCost(recipeData[0])).to.equal('$59.21');
    });
   
  });
})



// Cookbook - calculateCost and findRecipe
