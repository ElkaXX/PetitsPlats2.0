const filtersBodyDOM = document.querySelector("body");
const filtersSelectedFiltersListDOM =
  document.querySelector(".selected-filters");
const ingredientsFilterDOM = document.querySelector(".ingredients-filter");
const ingredientsFilterListDOM = ingredientsFilterDOM.querySelector("ul");

const filters = [ingredientsFilterDOM];
const filtersIngredients = new Map();
const filtersAppliances = new Map();
const filtersUstensils = new Map();

const filtersFilteredIngredients = new Map();

const filtersSelectedIngredients = new Map();
const filtersSelectedAppliances = new Map();
const filtersSelectedUstensils = new Map();

function initFilters() {
  filtersPopulate();
  filtersUpdateDOM();

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
    recipeData.ingredients.forEach((ingredient) => {
      if (!filtersIngredients.has(ingredient.key)) {
        const itemData = {
          html: filstersGetItemHTML(
            ingredient.key,
            ingredient.name,
            filtersSelectedIngredients
          ),
          selectedHtml: filtersGetSelectedItemHTML(
            ingredient.key,
            ingredient.name,
            filtersSelectedIngredients
          ),
        };
        filtersIngredients.set(ingredient.key, itemData);
        filtersFilteredIngredients.set(ingredient.key, itemData);
      }
    });

    // if (!filtersAppliances.has(data.appliance)) {
    //   filtersAppliances.set(
    //     data.appliance,
    //     filstersGetItemHTML(data.appliance)
    //   );
    // }

    // data.ustensils.forEach((ustensil) => {
    //   if (!filtersUstensils.has(ustensil)) {
    //     filtersUstensils.set(ustensil, filstersGetItemHTML(ustensil));
    //   }
    // });
  });
}

function filtersUpdateTags() {
  filtersFilteredIngredients.clear();
  recipeFilteredDataList.forEach((recipeData) => {
    recipeData.ingredients.forEach((ingredient) => {
      const value = filtersIngredients.get(ingredient.key);
      filtersFilteredIngredients.set(ingredient.key, value);
    });
  });
}

function filtersUpdateDOM() {
  ingredientsFilterListDOM.innerHTML = "";
  filtersFilteredIngredients.forEach((item) => {
    ingredientsFilterListDOM.appendChild(item.html);
  });
}

function filtersUpdateSelectedDOM() {
  filtersSelectedFiltersListDOM.innerHTML = "";

  filtersSelectedIngredients.keys().forEach((ingredientKey) => {
    const item = filtersIngredients.get(ingredientKey);
    filtersSelectedFiltersListDOM.appendChild(item.selectedHtml);
  });
}

function filstersGetItemHTML(filterKey, filterValue, selectedList) {
  const li = document.createElement("li");
  li.classList.value =
    "px-[16px] py-[9px] w-[100%] h-[100%] cursor-pointer hover:bg-[#FFD15B] transition-colors duration-200 ease-in-out";
  li.textContent = filterValue;

  li.addEventListener("click", () => {
    if (selectedList.has(filterKey)) {
      selectedList.delete(filterKey);
    } else {
      selectedList.set(filterKey, filterValue);
    }

    searchHandleInputWithTags();
  });

  return li;
}

function filtersGetSelectedItemHTML(filterKey, filterValue, selectedList) {
  const li = document.createElement("li");
  li.classList.value =
    "py-[17px] px-[18px] bg-[#FFD15B] rounded-[10px] flex justify-start items-center gap-x-[30px]";

  const text = document.createElement("div");
  text.textContent = filterValue;

  const img = document.createElement("img");
  img.src = "img/selected-filter-cross.svg";
  img.alt = "cross";

  const crossBtn = document.createElement("button");
  crossBtn.appendChild(img);

  crossBtn.addEventListener("click", () => {
    selectedList.delete(filterKey);
    searchHandleInputWithTags();
  });

  li.appendChild(text);
  li.appendChild(crossBtn);

  return li;
}
