

let body = document.querySelector('body');
let userWelcomeMessage = document.querySelector('.title-and-greeting-wrapper');
let subheaderWrapper = document.querySelector('.my-recipes');
let recipesWrapper = document.querySelector('main');


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

const displayRecipeCards = () => {
  recipesWrapper.innerHTML = '';
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
  });
};

const displayFavoriteRecipes = () => {
  recipesWrapper.innerHTML = '';
  subheaderWrapper.innerHTML = '';
  subheaderWrapper.insertAdjacentHTML('afterbegin', `
      <h1>My Recipes</h1>
      <div class="my-recipes-nav-buttons-wrapper">
        <button tabindex="2" class="all-recipes-button" type="button">All Recipes</button>
      </div>
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

const removeFavoriteRecipeCard = (e) => {
  console.log('hey');
  if (e.target.classList.contains('handle-favorites')) {
    e.target.closest('.recipe-card').remove();
  }

}

const displayRecipesToCook = () => {
  subheaderWrapper.innerHTML = '';
  recipesWrapper.innerHTML = '';
  subheaderWrapper.insertAdjacentHTML('afterbegin', `
      <h1>This Week</h1>
      <div class="my-recipes-nav-buttons-wrapper">
        <button tabindex="2" class="all-recipes-button" type="button">All Recipes</button>
      </div>
  `);
}

const updateFavoritesButton = (e) => {
  e.target.classList.toggle('favorite-recipe-icon-inactive');
  updateUserFavorites(e);
}

const updateUserFavorites = (e) => {
  let favoritedRecipe = parseInt(e.target.closest('.recipe-card').id);
  let foundRecipe = recipeData.find(recipe => recipe.id === favoritedRecipe);

  if (!e.target.classList.contains('favorite-recipe-icon-inactive')) {
    user.addRecipeToFavorites(foundRecipe);
  } else {
    user.removeRecipeFromFavorites(foundRecipe);
    removeFavoriteRecipeCard(e);
  }
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
  }

}
body.addEventListener('click', eventHandler);

//
