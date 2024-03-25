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
    ingredientValue.textContent = getCorrectIngredientValue(ingredient);

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

  const li = document.createElement("li");
  li.classList.value = "w-[380px] rounded-2xl shadow-lg bg-white";
  li.appendChild(img);
  li.appendChild(content);

  return li;
}

function getCorrectIngredientValue(ingredient) {
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
