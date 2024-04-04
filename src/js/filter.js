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

const filtersSelectedIngredients = new Set();
const filtersSelectedAppliances = new Set();
const filtersSelectedUstensils = new Set();

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
    const data = recipeData.data;

    data.ingredients.forEach((ingredient) => {
      const value = ingredient.ingredient;
      if (!filtersIngredients.has(value)) {
        const itemData = {
          html: filstersGetItemHTML(value, filtersSelectedIngredients),
          selectedHtml: filtersGetSelectedItemHTML(value),
        };
        filtersIngredients.set(value, itemData);
        filtersFilteredIngredients.set(value, itemData);
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
    const data = recipeData.data;
    data.ingredients.forEach((ingredient) => {
      const key = ingredient.ingredient;
      const value = filtersIngredients.get(key);
      filtersFilteredIngredients.set(key, value);
    });
  });
}

function filtersUpdateDOM() {
  ingredientsFilterListDOM.innerHTML = "";
  filtersFilteredIngredients.forEach((item) => {
    ingredientsFilterListDOM.appendChild(item.html);
  });
}

function filstersGetItemHTML(filterValue, selectedList) {
  const li = document.createElement("li");
  li.classList.value =
    "px-[16px] py-[9px] w-[100%] h-[100%] cursor-pointer hover:bg-[#FFD15B] transition-colors duration-200 ease-in-out";
  li.textContent = filterValue;

  li.addEventListener("click", () => {
    if (selectedList.has(filterValue)) {
      selectedList.delete(filterValue);
    } else {
      selectedList.add(filterValue);
    }

    searchHandleInputWithTags();
  });

  return li;
}

function filtersGetSelectedItemHTML(value) {
  const li = document.createElement("li");
  li.classList.value =
    "py-[17px] px-[18px] bg-[#FFD15B] rounded-[10px] flex justify-start items-center gap-x-[30px]";

  const text = document.createElement("div");
  text.textContent = value;

  const img = document.createElement("img");
  img.src = "img/selected-filter-cross.svg";
  img.alt = "cross button";

  li.appendChild(text);
  li.appendChild(img);

  return li;
}
