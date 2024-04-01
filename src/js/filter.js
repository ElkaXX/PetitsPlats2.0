const filtersBodyDOM = document.querySelector("body");
const ingredientsFilterDOM = document.querySelector(".ingredients-filter");
const ingredientsFilterListDOM = ingredientsFilterDOM.querySelector("ul");

const filters = [ingredientsFilterDOM];
const filtersIngredients = new Map();
const filtersAppliances = new Map();
const filtersUstensils = new Map();

function initFilters() {
  filtersPopulate();

  filters.forEach((filter) =>
    filter.addEventListener("click", () => {
      filter.classList.toggle("open");
    })
  );

  filtersBodyDOM.addEventListener("click", () => {
    filters.forEach((filter) => {
      filter.classList.remove("open");
    });
  });
}

function filtersPopulate() {
  recipeDataList.forEach((recipeData) => {
    const data = recipeData.data;

    data.ingredients.forEach((ingredient) => {
      const value = ingredient.ingredient;
      if (!filtersIngredients.has(value)) {
        filtersIngredients.set(value, filstersGetItemHTML(value));
      }
    });

    if (!filtersAppliances.has(data.appliance)) {
      filtersAppliances.set(
        data.appliance,
        filstersGetItemHTML(data.appliance)
      );
    }

    data.ustensils.forEach((ustensil) => {
      if (!filtersUstensils.has(ustensil)) {
        filtersUstensils.set(ustensil, filstersGetItemHTML(ustensil));
      }
    });
  });

  ingredientsFilterListDOM.innerHTML = "";
  filtersIngredients.forEach((item) => {
    ingredientsFilterListDOM.appendChild(item);
  });
}

function filstersGetItemHTML(filterValue) {
  const li = document.createElement("li");
  li.classList.value =
    "px-[16px] py-[9px] w-[100%] h-[100%] cursor-pointer hover:bg-[#FFD15B] transition-colors duration-200 ease-in-out";
  li.textContent = filterValue;
  return li;
}
