let body = document.querySelector('body');
let recipesWrapper = document.querySelector('main');

let cookbook, currentUser, pantry, filteredTagTypes = [];

const findRandomUser = () => {
  for (let i = usersData.length - 1; i > 0; i--) {
    let n = Math.floor(Math.random() * (i + 1));
    [usersData[i], usersData[n]] = [usersData[n], usersData[i]];
  }
  return usersData[0];
}

const pageLoad = () => {
  let usersData = findRandomUser();
  cookbook = new Cookbook(recipeData, ingredientsData);
  currentUser = new User(usersData);
  pantry = new Pantry(currentUser.userData.pantry, ingredientsData);
  domUpdatesHeader.userName(usersData);
  domUpdatesHomePage.search();
  domUpdatesHomePage.filter();
  domUpdatesHomePage.recipes(currentUser);
}


const getRecipeTypes = () => {
  return recipeData.reduce((acc, recipe) => {
    recipe.tags.forEach(tag => {
      !acc.includes(tag) && acc.push(tag);
    })
    return acc;
  }, []);
}

const findRecipeID = (e) => {
  return parseInt(e.target.closest('.recipe-card').id);
}

const updateUsersFavorites = (e) => {
  let foundRecipe = recipeData.find(recipe => recipe.id === findRecipeID(e));
  !e.target.classList.contains('favorite-recipe-icon-inactive') ?
    currentUser.addRecipeToFavorites(foundRecipe) :
    currentUser.removeRecipeFromFavorites(foundRecipe);
}

const updateUsersRecipesThisWeek = (e) => {
  let foundRecipe = recipeData.find(recipe => recipe.id === findRecipeID(e));
  !currentUser.recipesToCook.includes(foundRecipe) ?
    currentUser.saveRecipeToCook(foundRecipe) :
    currentUser.removeRecipeToCook(foundRecipe);
}

const getFilteredTagTypes = (e) => {
  recipeData.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (tag === e.target.closest('li').innerText.toLowerCase() && !filteredTagTypes.includes(tag)) {
        filteredTagTypes.push(tag);
      }
    });
    return filteredTagTypes;
  });
}

const getAllFilteredRecipes = (e) => {
  domUpdatesHomePage['checkedRecipes'] = filteredTagTypes.reduce((acc, tag) => {
    recipeData.forEach(recipe => {
      if (recipe.tags.includes(tag) && !acc.includes(recipe)) {
        acc.push(recipe);
      }
    });
    return acc.sort((a, b) => a.id - b.id);
  }, []);
  domUpdatesHomePage.filterResults();
  domUpdatesHomePage.filter();
  filteredTagTypes = [];
}

const getFavoriteFilteredRecipes = (e) => {
  let filtered = filteredTagTypes.reduce((acc, tag) => {
    currentUser.filterFavoriteRecipes(tag).forEach(recipe => {
      !acc.includes(recipe) && acc.push(recipe);
    });
    return acc.sort((a, b) => a.id - b.id);
  }, []);
  domUpdatesFavoritesPage.filterResults(filtered);
  domUpdatesFavoritesPage.filter();
  filteredTagTypes = [];
}

const getToCookThisWeekFilteredRecipes = (e) => {
  let filtered = filteredTagTypes.reduce((acc, tag) => {
    currentUser.filterRecipesToCook(tag).forEach(recipe => {
      !acc.includes(recipe) && acc.push(recipe);
    });
    return acc.sort((a, b) => a.id - b.id);
  }, []);
  domUpdatesCookThisWeekPage.filterResults(filtered);
  domUpdatesCookThisWeekPage.filter();
  filteredTagTypes = [];
}

const getSearchInput = (e) => {
  const filteredSearchInput = e.target.nextElementSibling.value;
  let filteredRecipesBySearchInput = recipeData.reduce((acc, recipe) => {
    recipe.ingredients.forEach(ingredient => {
      ingredientsData.forEach(ingredientData => {
        if (ingredient.id === ingredientData.id && ingredientData.name.includes(filteredSearchInput) && !acc.includes(recipe)) {
          acc.push(recipe);
        }
      });
    });
    return acc;
  }, []);

  domUpdatesHomePage.searchResults(filteredRecipesBySearchInput);
}

const getFavoritesSearchInput = (e) => {
  const filteredSearchInput = e.target.nextElementSibling.value;
  filteredRecipesBySearchInput = currentUser.findFavorites(filteredSearchInput);

  domUpdatesFavoritesPage.searchResults(filteredRecipesBySearchInput);
}

const getThisWeekSearchInput = (e) => {
  const filteredSearchInput = e.target.nextElementSibling.value;
}

const getRecipeInfo = (e) => {
  let recipeCardID = e.target.closest('.recipe-card').id;
  let foundRecipe = recipeData.find(recipe => recipe.id === parseInt(recipeCardID));
  let userPantryInfo = pantry.canUserPantryCookSelectedMeal(foundRecipe);
  let recipeCost = cookbook.calculateCost(foundRecipe);

  console.log(foundRecipe);
  domUpdatesRecipeCardInfo.card(foundRecipe, userPantryInfo);


  getMissingIngredientCost(userPantryInfo, recipeCost);
}

const getMissingIngredientCost = (ingredients, recipeCost) => {
  let dollars = ingredients.missing.reduce((acc, ingredient) => {
    acc += ingredient.cost;

    return acc;
  }, 0);
  dollars /= 10;
  dollars = dollars.toLocaleString(undefined, {
    style: "currency",
    currency: "USD"
  })

  domUpdatesRecipeCardInfo.recipeCost(dollars, recipeCost);
}

pageLoad();

const eventHandler = (e) => {
  if (e.target.classList.contains('view-favorites-button')) {
    domUpdatesFavoritesPage.search(e);
    domUpdatesFavoritesPage.filter(e);
    domUpdatesFavoritesPage.subHeader(e);
    domUpdatesFavoritesPage.favoriteRecipes(e, currentUser);
  } else if (e.target.classList.contains('this-week-button')) {
    domUpdatesCookThisWeekPage.search(e);
    domUpdatesCookThisWeekPage.filter(e);
    domUpdatesCookThisWeekPage.subHeader(e);
    domUpdatesCookThisWeekPage.recipesToCook(e, currentUser);
  } else if (e.target.classList.contains('home-button')) {
    domUpdatesHomePage.search(e);
    domUpdatesHomePage.filter(currentUser, e);
    domUpdatesHomePage.recipes(currentUser, e);
  } else if (e.target.classList.contains('handle-users-data')) {
    updateUsersFavorites(e);
  } else if (e.target.classList.contains('handle-recipes-this-week')) {
    updateUsersRecipesThisWeek(e);
  } else if (e.target.classList.contains('checkbox')) {
    getFilteredTagTypes(e);
  } else if (e.target.classList.contains('filter-all-recipes-by-type-button')) {
    getAllFilteredRecipes(e);
  } else if (e.target.classList.contains('filter-all-recipes-button')) {
    domUpdatesTagTypeListItems.allRecipes(e, getRecipeTypes());
  } else if (e.target.classList.contains('filter-favorite-recipes-button')) {
    domUpdatesTagTypeListItems.favoriteRecipes(e, getRecipeTypes());
  } else if (e.target.classList.contains('filter-this-week-recipes-button')) {
    domUpdatesTagTypeListItems.thisWeekRecipes(e, getRecipeTypes());
  } else if (e.target.classList.contains('filter-favorite-recipes-by-type-button')) {
    getFavoriteFilteredRecipes(e);
  } else if (e.target.classList.contains('filter-this-week-recipes-by-type-button')) {
    getToCookThisWeekFilteredRecipes(e);
  } else if (e.target.classList.contains('search-icon-home')) {
    getSearchInput(e);
  } else if (e.target.classList.contains('search-icon-favorites')) {
    getFavoritesSearchInput(e);
  } else if (e.target.classList.contains('search-icon-this-week')) {
    getThisWeekSearchInput(e);
  } else if (e.target.classList.contains('recipe-image')) {
    getRecipeInfo(e);
  }
}

body.addEventListener('click', eventHandler);
