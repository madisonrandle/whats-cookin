let body = document.querySelector('body');
let userWelcomeMessage = document.querySelector('.title-and-greeting-wrapper');
let subheaderWrapper = document.querySelector('.my-recipes');
let recipesWrapper = document.querySelector('main');
let filterWrapper = document.querySelector('.filter-by-type-wrapper');


let user;

const findRandomUser = () => {
  for (let i = usersData.length - 1; i > 0; i--) {
    let n = Math.floor(Math.random() * (i + 1));
    [usersData[i], usersData[n]] = [usersData[n], usersData[i]];
  }
  return usersData[0];
}

const getUserData = () => {
  let userData = findRandomUser();
  user = new User(userData);
  displayRecipeCards();
  displayUserName(userData);
}

const displayUserName = (userData) => {
  const firstName = userData.name.split(' ');
  userWelcomeMessage.insertAdjacentHTML('beforeend', `
    <h2>Welcome, ${firstName[0]}</h2>
  `);
};

const displayRecipeCards = (e) => {
  let addFavoriteButtonElement;
  // filterWrapper.lastElementChild.innerHTML = '';
  // recipesWrapper.innerHTML = '';
  // subheaderWrapper.innerHTML = '';
  removeWrappersInnerHtml();
  recipeData.forEach(recipe => {
    recipesWrapper.insertAdjacentHTML('afterbegin', `
      <article class="recipe-card" id=${recipe.id}>
        <section class="recipe-card-header">
          <button tabindex="2" type="button" class="add-recipe-icon"></button>
          <button tabindex="2" type="button" class="favorite-recipe-icon-inactive favorite-recipe-icon-active"></button>
        </section>
        <p class="recipe-name">${recipe.name}</p>
        <section tabindex="2" class="recipe-card-main">
          <img class="recipe-image" src="${recipe.image}" alt="Picture of ${recipe.name}">
        </section>
      </article>
    `);
    addFavoriteButtonElement = recipesWrapper.firstElementChild.firstElementChild;
    user.favoriteRecipes.forEach(favoritedRecipe => {
      if (favoritedRecipe.id === recipe.id) {
        addFavoriteButtonElement.parentElement.remove();
        recipesWrapper.insertAdjacentHTML('afterbegin', `
          <article class="recipe-card" id=${favoritedRecipe.id}>
          <section class="recipe-card-header">
          <button tabindex="2" type="button" class="add-recipe-icon"></button>
          <button tabindex="2" type="button" class="favorite-recipe-icon-active"></button>
          </section>
          <p class="recipe-name">${favoritedRecipe.name}</p>
          <section tabindex="2" class="recipe-card-main">
          <img class="recipe-image" src="${favoritedRecipe.image}" alt="Picture of ${favoritedRecipe.name}">
          </section>
          </article>
        `);
      };
    });
  });
};

const displayFavoriteRecipes = () => {
  // filterWrapper.lastElementChild.innerHTML = '';
  // recipesWrapper.innerHTML = '';
  // subheaderWrapper.innerHTML = '';
  removeWrappersInnerHtml();
  subheaderWrapper.insertAdjacentHTML('afterbegin', `
      <h1>Favorite Recipes</h1>
  `);

  user.favoriteRecipes.forEach(recipe => {
    recipesWrapper.insertAdjacentHTML('afterbegin', `
      <article class="recipe-card" id=${recipe.id}>
        <section class="recipe-card-header">
          <button tabindex="2" type="button" class="add-recipe-icon"></button>
          <button tabindex="2" type="button" class="favorite-recipe-icon-active handle-favorites"></button>
        </section>
        <p class="recipe-name">${recipe.name}</p>
        <section tabindex="2" class="recipe-card-main">
          <img class="recipe-image" src="${recipe.image}" alt="Picture of ${recipe.name}">
        </section>
      </article>
    `);
  });
}

const removeRecipeCard = (e) => {
  e.target.classList.contains('handle-favorites') && e.target.closest('.recipe-card').remove();
}

const displayRecipesToCook = (e) => {
  // filterWrapper.lastElementChild.innerHTML = '';
  // subheaderWrapper.innerHTML = '';
  // recipesWrapper.innerHTML = '';
  removeWrappersInnerHtml();
  subheaderWrapper.insertAdjacentHTML('afterbegin', `
      <h1>This Week</h1>
  `);

  user.recipesToCook.forEach(recipe => {
    recipesWrapper.insertAdjacentHTML('afterbegin', `
      <article class="recipe-card" id=${recipe.id}>
        <section class="recipe-card-header">
          <button tabindex="2" type="button" class="add-recipe-icon"></button>
          <button tabindex="2" type="button" class="remove-recipe-icon handle-favorites"></button>
        </section>
        <p class="recipe-name">${recipe.name}</p>
        <section tabindex="2" class="recipe-card-main">
          <img class="recipe-image" src="${recipe.image}" alt="Picture of ${recipe.name}">
        </section>
      </article>
    `);
    addFavoriteButtonElement = recipesWrapper.firstElementChild.firstElementChild.lastElementChild;
    user.favoriteRecipes.forEach(favoritedRecipe => {
      if (favoritedRecipe.id === parseInt(recipesWrapper.firstElementChild.id)) {
        addFavoriteButtonElement.classList.remove('favorite-recipe-icon-inactive');
      }
    });
  });
}

const updateFavoritesButton = (e) => {
  e.target.classList.toggle('favorite-recipe-icon-inactive');
  updateUserFavorites(e);
}

const updateUserFavorites = (e) => {
  let favoritedRecipeID = parseInt(e.target.closest('.recipe-card').id);
  let foundRecipe = recipeData.find(recipe => recipe.id === favoritedRecipeID);

  !e.target.classList.contains('favorite-recipe-icon-inactive') ?
    user.addRecipeToFavorites(foundRecipe) :
      user.removeRecipeFromFavorites(foundRecipe)
        removeRecipeCard(e);
}

const addRecipeToCook = (e) => {
  let addedRecipeToCookID = parseInt(e.target.closest('.recipe-card').id);
  let foundRecipe = recipeData.find(recipe => recipe.id === addedRecipeToCookID);
  !user.recipesToCook.includes(foundRecipe) && user.saveRecipeToCook(foundRecipe);
}

const removeRecipeToCook = (e) => {
  let recipeToRemoveID = parseInt(e.target.closest('.recipe-card').id);
  let foundRecipe = recipeData.find(recipe => recipe.id === recipeToRemoveID);
  user.removeRecipeToCook(foundRecipe)
  removeRecipeCard(e);
}

const displayTypeFilter = (e) => {
  filterWrapper.lastElementChild.innerHTML = '';
  filterWrapper.insertAdjacentHTML('beforeend', `
    <ul class="type-checklist">
      <li><input tabindex="2" type="checkbox" />Antipasti</li>
      <li><input tabindex="2" type="checkbox" />Antipasto</li>
      <li><input tabindex="2" type="checkbox" />Appetizer</li>
      <li><input tabindex="2" type="checkbox" />Breakfast</li>
      <li><input tabindex="2" type="checkbox" />Brunch</li>
      <li><input tabindex="2" type="checkbox" />Condiment</li>
      <li><input tabindex="2" type="checkbox" />Dinner</li>
      <li><input tabindex="2" type="checkbox" />Dip</li>
      <li><input tabindex="2" type="checkbox" />Hor D'oeuvre</li>
      <li><input tabindex="2" type="checkbox" />Lunch</li>
      <li><input tabindex="2" type="checkbox" />Main Course</li>
      <li><input tabindex="2" type="checkbox" />Main Dish</li>
      <li><input tabindex="2" type="checkbox" />Morning Meal</li>
      <li><input tabindex="2" type="checkbox" />Salad</li>
      <li><input tabindex="2" type="checkbox" />Sauce</li>
      <li><input tabindex="2" type="checkbox" />Side Dish</li>
      <li><input tabindex="2" type="checkbox" />Snack</li>
      <li><input tabindex="2" type="checkbox" />Spread</li>
      <li><input tabindex="2" type="checkbox" />Starter</li>
    </ul>
  `)
}

const removeWrappersInnerHtml = () => {
  filterWrapper.lastElementChild.innerHTML = '';
  recipesWrapper.innerHTML = '';
  subheaderWrapper.innerHTML = '';
}

getUserData();

const eventHandler = (e) => {
  if (e.target.classList.contains('view-favorites-button')) {
    displayFavoriteRecipes(e);
  } else if (e.target.classList.contains('this-week-button')) {
    displayRecipesToCook(e);
  } else if (e.target.classList.contains('home-button')) {
    displayRecipeCards(e);
  } else if (e.target.classList.contains('favorite-recipe-icon-active')) {
    updateFavoritesButton(e);
  } else if (e.target.classList.contains('add-recipe-icon')) {
    addRecipeToCook(e);
  } else if (e.target.classList.contains('remove-recipe-icon')) {
    removeRecipeToCook(e);
  } else if (e.target.classList.contains('search-by-type-click')) {
    displayTypeFilter(e);
  }
}

body.addEventListener('click', eventHandler);
