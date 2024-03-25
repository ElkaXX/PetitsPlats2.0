async function getRecipesAsync() {
  try {
    const response = await fetch("data/recipes.json");
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function initAsync() {
  const recipes = await getRecipesAsync();

  const recipesList = document.querySelector(".recipes-list");
  const receipeCounter = document.querySelector(".recipe-counter");

  receipeCounter.textContent = `${recipes.length} recettes`;

  recipes.forEach((recipe) => {
    const recipeHtml = getRecipeHtml(recipe);
    recipesList.appendChild(recipeHtml);
  });
}

initAsync();
