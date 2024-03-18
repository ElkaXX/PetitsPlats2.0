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

    console.log(recipes[0]);
}

initAsync();