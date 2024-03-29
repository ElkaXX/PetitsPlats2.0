const recipeListDOM = document.querySelector(".recipe-list");
const recipeCounterDOM = document.querySelector(".recipe-counter");
const recipeNoRecipesDOM = document.querySelector(".no-recipes");

const recipeDataList = [];
const recipeFilteredDataList = [];

async function getRecipesAsync() {
  try {
    const response = await fetch("data/recipes.json");
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function getRecipeHtml(recipe) {
  const img = document.createElement("img");
  img.classList.value = "w-full h-[253px] object-cover rounded-t-2xl";
  img.src = `./img/recipes/${recipe.image}`;
  img.alt = recipe.name;

  const title = document.createElement("div");
  title.classList.value = "font-anton text-[18px]";
  title.textContent = recipe.name;

  const reciepeHeader = document.createElement("div");
  reciepeHeader.classList.value = "mt-[29px] text-[12px] text-grey";
  reciepeHeader.textContent = "RECETTE";

  const description = document.createElement("div");
  description.classList.value = "mt-[15px]";
  description.textContent = recipe.description;

  const ingredientsHeader = document.createElement("div");
  ingredientsHeader.classList.value = "mt-[32px] text-[12px] text-grey";
  ingredientsHeader.textContent = "Ingrédients";

  const ingredients = document.createElement("ul");
  ingredients.classList.value = "mt-[15px] grid grid-cols-2 gap-y-[21px]";

  recipe.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");

    const ingredientName = document.createElement("div");
    ingredientName.classList.value = "font-medium";
    ingredientName.textContent = ingredient.ingredient;

    const ingredientValue = document.createElement("div");
    ingredientValue.classList.value = "text-grey";
    ingredientValue.textContent = getRecipeCorrectIngredientValue(ingredient);

    ingredientItem.appendChild(ingredientName);
    ingredientItem.appendChild(ingredientValue);

    ingredients.appendChild(ingredientItem);
  });

  const content = document.createElement("div");
  content.classList.value = "pt-[32px] pb-[60px] px-[25px]";
  content.appendChild(title);
  content.appendChild(reciepeHeader);
  content.appendChild(description);
  content.appendChild(ingredientsHeader);
  content.appendChild(ingredients);

  const time = document.createElement("div");
  time.classList.value =
    "absolute top-[21px] right-[22px] bg-[#FFD15B] border border-solid border-0 rounded-[14px] px-[15px] py-[5px] font-manrope text-[12px]";
  time.textContent = `${recipe.time}min`;

  const li = document.createElement("li");
  li.classList.value = "relative w-[380px] rounded-2xl shadow-lg bg-white";
  li.appendChild(img);
  li.appendChild(content);
  li.appendChild(time);

  return li;
}

function getRecipeFilterContent(recipe) {
  let content;

  content = recipe.name.toLowerCase();
  content += " " + recipe.description.toLowerCase();
  content += " " + recipe.appliance.toLowerCase();
  content += " " + recipe.ustensils.map((item) => item.toLowerCase()).join(" ");
  content +=
    " " +
    recipe.ingredients.map((item) => item.ingredient.toLowerCase()).join(" ");

  return content;
}

function getRecipeCorrectIngredientValue(ingredient) {
  const quantity = ingredient.quantity?.toString();
  const unit = ingredient.unit?.toLowerCase();

  if (!quantity) {
    return "-";
  }

  if (!unit) {
    return quantity;
  }

  if (unit.length <= 2) {
    return quantity + ingredient.unit;
  }

  return quantity + " " + ingredient.unit;
}

function applyFiltering(recipeDataList) {
  recipeFilteredDataList.splice(0, recipeFilteredDataList.length);

  recipeDataList.forEach((recipeData) => {
    recipeFilteredDataList.push(recipeData);
  });

  updateRecipeListDOM();
}

function updateRecipeListDOM() {
  recipeListDOM.innerHTML = "";
  recipeCounterDOM.textContent = `${recipeFilteredDataList.length} recettes`;

  if (recipeFilteredDataList.length === 0) {
    recipeListDOM.classList.add("hidden");
    recipeNoRecipesDOM.classList.remove("hidden");
    recipeNoRecipesDOM.textContent = `Aucune recette ne contient '${searchInputDOM.value}' vous pouvez chercher «
    tarte aux pommes », « poisson », etc.`;
  } else {
    recipeListDOM.classList.remove("hidden");
    recipeNoRecipesDOM.classList.add("hidden");
  }

  recipeFilteredDataList.forEach((recipeData) => {
    recipeListDOM.appendChild(recipeData.html);
  });
}

async function initRecipeAsync() {
  const recipes = await getRecipesAsync();

  recipes
    .map((recipe) => ({
      data: recipe,
      html: getRecipeHtml(recipe),
      content: getRecipeFilterContent(recipe),
    }))
    .forEach((recipeData) => {
      recipeDataList.push(recipeData);
      recipeFilteredDataList.push(recipeData);
    });

  updateRecipeListDOM();
}
