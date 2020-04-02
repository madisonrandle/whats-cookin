const header = document.querySelector('.home-page-header');
const main = document.querySelector('main');
const filterWrapper = document.querySelector('.filter-by-type-wrapper');
const filterButton = document.querySelector('.filter-button');
const searchWrapper = document.querySelector('.recipe-search-input-wrapper');
const instructionsWrapper = document.querySelector('.instructions');
const ingredientsWrapper = document.querySelector('.ingredients');
const ingredientsNeededWrapper = document.querySelector('.ingredients-needed-to-cook');
const recipeCostWrapper = document.querySelector('.recipe-cost');

const domUpdatesHeader = {
  userName: (userData) => {
    const splitName = userData.name.split(' ');
    header.firstElementChild.insertAdjacentHTML('beforeend', `
      <h2>Welcome, ${splitName[0]}</h2>
    `);
  },
}

const domUpdatesTagTypeListItems = {
  allRecipes: (e, recipeTypes) => {
    domUpdates.disableFilterButton(e);
    recipeTypes.sort().forEach(type => {
      filterWrapper.lastElementChild.insertAdjacentHTML('beforeend', `
        <li><input tabindex="2" type="checkbox" class="all-recipes-checkbox checkbox"/>${type}</li>
      `);
    });
    filterWrapper.lastElementChild.insertAdjacentHTML('beforeend', `
      <li><button tabindex="2" class="filter-all-recipes-by-type-button">Filter By Type</button></li>
    `);
  },

  favoriteRecipes: (e, recipeTypes) => {
    domUpdates.disableFilterButton(e);
    recipeTypes.sort().forEach(type => {
      filterWrapper.lastElementChild.insertAdjacentHTML('beforeend', `
        <li><input tabindex="2" type="checkbox" class="favorite-recipes-checkbox checkbox"/>${type}</li>
      `);
    });
    filterWrapper.lastElementChild.insertAdjacentHTML('beforeend', `
      <li><button tabindex="2" class="filter-favorite-recipes-by-type-button">Filter By Type</button></li>
    `);
  },

  thisWeekRecipes: (e, recipeTypes) => {
    domUpdates.disableFilterButton(e);
    recipeTypes.sort().forEach(type => {
      filterWrapper.lastElementChild.insertAdjacentHTML('beforeend', `
        <li><input tabindex="2" type="checkbox" class="this-week-recipes-checkbox checkbox"/>${type}</li>
      `);
    });
    filterWrapper.lastElementChild.insertAdjacentHTML('beforeend', `
      <li><button tabindex="2" class="filter-this-week-recipes-by-type-button">Filter By Type</button></li>
    `);
  },

}

const domUpdatesHomePage = {
  search: (e) => {
    searchWrapper.innerHTML = '';
    searchWrapper.insertAdjacentHTML('afterbegin', `
      <button tabindex="2" type="button" class="search-icon-home"></button>
      <input tabindex="1" class="recipe-search-input" type="text" value="search recipes by ingredient" onfocus="this.value=''">
    `);
  },

  filter: (e) => {
    filterWrapper.innerHTML = '';
    filterWrapper.insertAdjacentHTML('afterbegin', `
      <button tabindex="2" type="submit" class="filter-all-recipes-button filter-button">Filter Recipes</button>
    `);
    filterWrapper.insertAdjacentHTML('beforeend', `
      <ul class="type-checklist"></ul>
    `);
  },

  filterResults: (e, filteredTagTypes) => {
    main.innerHTML = '';
    main.nextElementSibling.classList.add('hidden');
    header.nextElementSibling.innerHTML = '';
    header.nextElementSibling.insertAdjacentHTML('beforeend', `
      <h3>Filtered Recipes</h3>
    `);
    domUpdatesHomePage.checkedRecipes.forEach(recipe => {
      main.insertAdjacentHTML('afterbegin', `
        <article class="recipe-card" id=${recipe.id}>
          <section class="recipe-card-header">
            <button tabindex="2" type="button" class="add-recipe-icon handle-recipes-this-week"></button>
            <button tabindex="2" type="button" class="favorite-recipe-icon-inactive favorite-recipe-icon-active handle-users-data"></button>
          </section>
          <p class="recipe-name">${recipe.name}</p>
          <section tabindex="2" class="recipe-card-main">
            <img class="recipe-image" src="${recipe.image}" alt="Picture of ${recipe.name}">
          </section>
        </article>
      `);
    });
  },

  searchResults: (recipes) => {
    main.innerHTML = '';
    main.nextElementSibling.classList.add('hidden');
    header.nextElementSibling.innerHTML = '';
    header.nextElementSibling.insertAdjacentHTML('beforeend', `
      <h3>Search Results</h3>
    `);
    recipes.forEach(recipe => {
      main.insertAdjacentHTML('afterbegin', `
        <article class="recipe-card" id=${recipe.id}>
          <section class="recipe-card-header">
            <button tabindex="2" type="button" class="add-recipe-icon handle-recipes-this-week"></button>
            <button tabindex="2" type="button" class="favorite-recipe-icon-inactive favorite-recipe-icon-active handle-users-data"></button>
          </section>
          <p class="recipe-name">${recipe.name}</p>
          <section tabindex="2" class="recipe-card-main">
            <img class="recipe-image" src="${recipe.image}" alt="Picture of ${recipe.name}">
          </section>
        </article>
      `);
    });
  },

  recipes: (currentUser, e) => {
    let favoritesButtonElement;
    reset.html();
    recipeData.forEach(recipe => {
      main.insertAdjacentHTML('afterbegin', `
        <article class="recipe-card" id=${recipe.id}>
          <section class="recipe-card-header">
            <button tabindex="2" type="button" class="add-recipe-icon handle-recipes-this-week"></button>
            <button tabindex="2" type="button" class="favorite-recipe-icon-inactive favorite-recipe-icon-active handle-users-data"></button>
          </section>
          <p class="recipe-name">${recipe.name}</p>
          <section tabindex="2" class="recipe-card-main">
            <img class="recipe-image" src="${recipe.image}" alt="Picture of ${recipe.name}">
          </section>
        </article>
      `);
      favoritesButtonElement = main.firstElementChild.firstElementChild;
      currentUser.favoriteRecipes.forEach(favoriteRecipe => {
        if (favoriteRecipe.id === recipe.id) {
          favoritesButtonElement.parentElement.remove();
          main.insertAdjacentHTML('afterbegin', `
            <article class="recipe-card" id=${favoriteRecipe.id}>
              <section class="recipe-card-header">
                <button tabindex="2" type="button" class="add-recipe-icon handle-recipes-this-week"></button>
                <button tabindex="2" type="button" class="favorite-recipe-icon-active handle-users-data"></button>
              </section>
              <p class="recipe-name">${favoriteRecipe.name}</p>
              <section tabindex="2" class="recipe-card-main">
                <img class="recipe-image" src="${favoriteRecipe.image}" alt="Picture of ${favoriteRecipe.name}">
              </section>
            </article>
          `);
        }
      });
    });
  },
}

const domUpdatesFavoritesPage = {
  search: (e) => {
    searchWrapper.innerHTML = '';
    searchWrapper.insertAdjacentHTML('afterbegin', `
      <button tabindex="2" type="button" class="search-icon-favorites"></button>
      <input tabindex="1" class="recipe-search-input" type="text" value="search recipes by ingredient/name" onfocus="this.value=''">
    `);
  },

  searchResults: (recipes) => {
    main.innerHTML = '';
    main.nextElementSibling.classList.add('hidden');
    header.nextElementSibling.innerHTML = '';
    header.nextElementSibling.insertAdjacentHTML('beforeend', `
      <h3>Search Results</h3>
    `);
    recipes.forEach(recipe => {
      main.insertAdjacentHTML('afterbegin', `
        <article class="recipe-card" id=${recipe.id}>
          <section class="recipe-card-header">
            <button tabindex="2" type="button" class="add-recipe-icon handle-recipes-this-week"></button>
            <button tabindex="2" type="button" class="favorite-recipe-icon-active handle-favorites handle-users-data"></button>
          </section>
          <p class="recipe-name">${recipe.name}</p>
          <section tabindex="2" class="recipe-card-main">
            <img class="recipe-image" src="${recipe.image}" alt="Picture of ${recipe.name}">
          </section>
        </article>
      `);
    });
  },

  filter: (e) => {
    filterWrapper.innerHTML = '';
    filterWrapper.insertAdjacentHTML('afterbegin', `
      <button tabindex="2" type="submit" class="filter-favorite-recipes-button">Filter Favorite Recipes</button>
    `);
    filterWrapper.insertAdjacentHTML('beforeend', `
      <ul class="type-checklist"></ul>
    `);
  },

  filterResults: (filtered) => {
    main.innerHTML = '';
    main.nextElementSibling.classList.add('hidden');
    header.nextElementSibling.innerHTML = '';
    header.nextElementSibling.insertAdjacentHTML('beforeend', `
        <h3>Filtered Recipes</h3>
    `);
    filtered.forEach(recipe => {
      main.insertAdjacentHTML('afterbegin', `
        <article class="recipe-card" id=${recipe.id}>
          <section class="recipe-card-header">
            <button tabindex="2" type="button" class="add-recipe-icon handle-recipes-this-week"></button>
            <button tabindex="2" type="button" class="favorite-recipe-icon-active handle-favorites handle-users-data"></button>
          </section>
          <p class="recipe-name">${recipe.name}</p>
          <section tabindex="2" class="recipe-card-main">
            <img class="recipe-image" src="${recipe.image}" alt="Picture of ${recipe.name}">
          </section>
        </article>
      `);
    });
  },

  subHeader: (e) => {
    reset.html();
    header.nextElementSibling.insertAdjacentHTML('afterbegin', `
        <h2>Favorite Recipes</h2>
    `);
  },

  favoriteRecipes: (e, currentUser) => {
    main.nextElementSibling.classList.add('hidden');
    currentUser.favoriteRecipes.forEach(recipe => {
      main.insertAdjacentHTML('afterbegin', `
        <article class="recipe-card" id=${recipe.id}>
          <section class="recipe-card-header">
            <button tabindex="2" type="button" class="add-recipe-icon handle-recipes-this-week"></button>
            <button tabindex="2" type="button" class="favorite-recipe-icon-active handle-favorites handle-users-data"></button>
          </section>
          <p class="recipe-name">${recipe.name}</p>
          <section tabindex="2" class="recipe-card-main">
            <img class="recipe-image" src="${recipe.image}" alt="Picture of ${recipe.name}">
          </section>
        </article>
      `);
    });
  },
}

const domUpdatesCookThisWeekPage = {
  search: (e) => {
    searchWrapper.innerHTML = '';
    searchWrapper.insertAdjacentHTML('afterbegin', `
      <button tabindex="2" type="button" class="search-icon-this-week"></button>
      <input tabindex="1" class="recipe-search-input" type="text" value="search recipes by ingredient" onfocus="this.value=''">
    `);
  },

  filter: (e) => {
    filterWrapper.innerHTML = '';
    filterWrapper.insertAdjacentHTML('beforeend', `
      <button tabindex="2" type="submit" class="filter-this-week-recipes-button filter-button" disabled>Filter Recipes This Week</button>
    `);
    filterWrapper.insertAdjacentHTML('beforeend', `
      <ul class="type-checklist"></ul>
    `);
  },

  filterResults: (filtered) => {
    main.innerHTML = '';
    main.nextElementSibling.classList.add('hidden');
    header.nextElementSibling.innerHTML = '';
    header.nextElementSibling.insertAdjacentHTML('beforeend', `
      <h3>Filtered Recipes</h3>
    `);
    filtered.forEach(recipe => {
      main.insertAdjacentHTML('afterbegin', `
        <article class="recipe-card" id=${recipe.id}>
          <section class="recipe-card-header">
            <button tabindex="2" type="button" class="add-recipe-icon handle-recipes-this-week"></button>
            <button tabindex="2" type="button" class="remove-recipe-icon handle-recipes-this-week"></button>
          </section>
          <p class="recipe-name">${recipe.name}</p>
          <section tabindex="2" class="recipe-card-main">
            <img class="recipe-image" src="${recipe.image}" alt="Picture of ${recipe.name}">
          </section>
        </article>
      `);
    });
  },

  subHeader: (e) => {
    reset.html();
    header.nextElementSibling.insertAdjacentHTML('afterbegin', `
        <h2>Recipes to Cook This Week</h2>
    `);
  },

  recipesToCook: (e, currentUser) => {
    main.nextElementSibling.classList.add('hidden');
    currentUser.recipesToCook.forEach(recipe => {
      main.insertAdjacentHTML('afterbegin', `
        <article class="recipe-card" id=${recipe.id}>
          <section class="recipe-card-header">
            <button tabindex="2" type="button" class="add-recipe-icon handle-recipes-this-week"></button>
            <button tabindex="2" type="button" class="remove-recipe-icon handle-recipes-this-week"></button>
          </section>
          <p class="recipe-name">${recipe.name}</p>
          <section tabindex="2" class="recipe-card-main">
            <img class="recipe-image" src="${recipe.image}" alt="Picture of ${recipe.name}">
          </section>
        </article>
      `);
    });
  },
}

const domUpdates = {
  favoriteButton: (e) => {
    e.target.classList.toggle('favorite-recipe-icon-inactive');
  },

  removeRecipeCard: (e) => {
    e.target.closest('.recipe-card').remove();
    domUpdates.favoriteButton(e);
  },

  disableFilterButton: (e) => {
    e.target.disabled = true;
  },

}

const domUpdatesRecipeCardInfo = {
  card: (recipe, pantry) => {
    main.innerHTML = '';
    main.nextElementSibling.classList.remove('hidden');
    instructionsWrapper.innerHTML = '';
    ingredientsWrapper.innerHTML = '';
    instructionsWrapper.parentElement.parentElement.firstElementChild.innerHTML = '';
    instructionsWrapper.parentElement.parentElement.firstElementChild.insertAdjacentHTML('afterbegin', `
     <h2 class="card-info-header">${recipe.name}</h2>
   `);

    instructionsWrapper.insertAdjacentHTML('afterbegin', `
      <p class="info-titles">Instructions</p>
      <ol class="instructions-list"></ol>
   `);

    ingredientsWrapper.insertAdjacentHTML('afterbegin', `
      <p class="info-titles">Ingredients</p>
      <ul class="ingredients-list"></ul>
   `);

    domUpdatesRecipeCardInfo.instructionsList(recipe.instructions);
    domUpdatesRecipeCardInfo.ingredientsList(recipe.ingredients);
    domUpdatesRecipeCardInfo.ingredientsNeeded(recipe.ingredients, pantry);
    domUpdatesRecipeCardInfo.recipeCost(recipe.ingredients);
  },

  instructionsList: (instructions) => {
    instructions.forEach(instruction => {
      instructionsWrapper.lastElementChild.insertAdjacentHTML('afterbegin', `
        <li class="instructions-list-items">${instruction.instruction}</li>
      `);
    });

  },

  ingredientsList: (ingredients) => {
    ingredientsData.forEach(ingredient => {
      ingredients.forEach(ingredientInfo => {
        let amount = ingredientInfo.quantity.amount;
        if (!Number.isInteger(amount)) {
          amount = amount.toFixed(1);
        }
        ingredient.id === ingredientInfo.id &&
          ingredientsWrapper.lastElementChild.insertAdjacentHTML('afterbegin', `
            <li class="ingredients-list-items">${amount} ${ingredientInfo.quantity.unit} ${ingredient.name}</li>
          `);
      });
    });
  },

  ingredientsNeeded: (ingredients, pantry) => {
    ingredientsNeededWrapper.innerHTML = '';
    ingredientsNeededWrapper.insertAdjacentHTML('afterbegin', `
      <p class="user-needs">You need the following ingredients to cook this recipe:</p>
      <ul></ul>
    `);

    domUpdatesRecipeCardInfo.ingredientItemsNeeded(pantry);
  },

  ingredientItemsNeeded: (pantry) => {
    if (pantry.missing.length > 0) {
      pantry.missing.forEach(item => {
        let amount = item.amount;
        let itemCost = item.cost;

        if (!Number.isInteger(amount)) {
          amount = amount.toFixed(1);
        }
        ingredientsNeededWrapper.lastElementChild.insertAdjacentHTML('afterbegin', `
          <li class="items-needed-li">${amount} ${item.unit} ${item.name} </li>
        `);
      });
    } else {
      ingredientsNeededWrapper.innerHTML = '';
      ingredientsNeededWrapper.insertAdjacentHTML('afterbegin', `
        <p>You have everything you need to cook this recipe!</p>
      `);

    }
  },

  recipeCost: (dollars, cost) => {
    console.log();
    recipeCostWrapper.innerHTML = `
      <p class="user-needs">Total Recipe Cost: ${cost}</p>
      <p class="user-needs">Cost of Ingredients You Need: ${dollars}</p>
    `;
  },

}

const reset = {
  html: () => {
    header.nextElementSibling.innerHTML = '';
    main.innerHTML = '';
    main.nextElementSibling.classList.add('hidden');
  },
}

const domUpdatesHandler = {
  event: (e) => {
    if (e.target.classList.contains('handle-favorites')) {
      domUpdates.removeRecipeCard(e);
    } else if (e.target.classList.contains('remove-recipe-icon')) {
      domUpdates.removeRecipeCard(e);
    } else if (e.target.classList.contains('favorite-recipe-icon-active')) {
      domUpdates.favoriteButton(e);
    }
  },
}

main.addEventListener('click', domUpdatesHandler.event);
header.addEventListener('click', domUpdatesHandler.event);

if (typeof module !== 'undefined') {
  module.exports = domUpdates;
}
