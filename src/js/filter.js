const filtersBodyDOM = document.querySelector("body");
const filtersSelectedFiltersListDOM =
  document.querySelector(".selected-filters");
const ingredientsFilterDOM = document.querySelector(".ingredients-filter");
const appliancesFilterDOM = document.querySelector(".appliances-filter");
const ustensilsFilterDOM = document.querySelector(".ustensils-filter");

const ingredientsFilterListDOM = ingredientsFilterDOM.querySelector("ul");
const appliancesFilterListDOM = appliancesFilterDOM.querySelector("ul");
const ustensilsFilterListDOM = ustensilsFilterDOM.querySelector("ul");

const filters = [ingredientsFilterDOM, appliancesFilterDOM, ustensilsFilterDOM];
const filtersIngredients = new Map();
const filtersAppliances = new Map();
const filtersUstensils = new Map();

const filtersFilteredIngredients = new Map();
const filtersFilteredAppliances = new Map();
const filtersFilteredUstensils = new Map();

const filtersSelectedIngredients = new Map();
const filtersSelectedAppliances = new Map();
const filtersSelectedUstensils = new Map();

function initFilters() {
  filtersPopulateAll();
  filtersSortTagsAll();
  filtersUpdateAllDOM();

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

function filtersPopulateAll() {
  recipeDataList.forEach((recipeData) => {
    filtersPopulate(
      recipeData.ingredients,
      filtersIngredients,
      filtersFilteredIngredients,
      filtersSelectedIngredients
    );
    filtersPopulate(
      recipeData.appliances,
      filtersAppliances,
      filtersFilteredAppliances,
      filtersSelectedAppliances
    );
    filtersPopulate(
      recipeData.ustensils,
      filtersUstensils,
      filtersFilteredUstensils,
      filtersSelectedUstensils
    );
  });
}

function filtersUpdateTagsAll() {
  filtersFilteredIngredients.clear();
  filtersFilteredAppliances.clear();
  filtersFilteredUstensils.clear();
  recipeFilteredDataList.forEach((recipeData) => {
    filtersUpdateTags(
      recipeData.ingredients,
      filtersIngredients,
      filtersFilteredIngredients
    );
    filtersUpdateTags(
      recipeData.appliances,
      filtersAppliances,
      filtersFilteredAppliances
    );
    filtersUpdateTags(
      recipeData.ustensils,
      filtersUstensils,
      filtersFilteredUstensils
    );
  });
}

function filtersUpdateAllDOM() {
  ingredientsFilterListDOM.innerHTML = "";
  filtersFilteredIngredients.forEach((item) => {
    ingredientsFilterListDOM.appendChild(item.html);
  });

  appliancesFilterListDOM.innerHTML = "";
  filtersFilteredAppliances.forEach((item) => {
    appliancesFilterListDOM.appendChild(item.html);
  });

  ustensilsFilterListDOM.innerHTML = "";
  filtersFilteredUstensils.forEach((item) => {
    ustensilsFilterListDOM.appendChild(item.html);
  });
}

function filtersUpdateSelectedAllDOM() {
  filtersSelectedFiltersListDOM.innerHTML = "";

  filtersSelectedIngredients.keys().forEach((ingredientKey) => {
    const item = filtersIngredients.get(ingredientKey);
    filtersSelectedFiltersListDOM.appendChild(item.selectedHtml);
  });

  filtersSelectedAppliances.keys().forEach((applianceKey) => {
    const item = filtersAppliances.get(applianceKey);
    filtersSelectedFiltersListDOM.appendChild(item.selectedHtml);
  });

  filtersSelectedUstensils.keys().forEach((ustensilKey) => {
    const item = filtersUstensils.get(ustensilKey);
    filtersSelectedFiltersListDOM.appendChild(item.selectedHtml);
  });
}

function filtersPopulate(
  recipeFilterList,
  filterList,
  filteredList,
  selectedList
) {
  recipeFilterList.forEach((filter) => {
    if (!filtersIngredients.has(filter.key)) {
      const html = filstersGetItemHTML(filter.key, filter.name, selectedList);
      const itemData = {
        key: filter.key,
        name: filter.name,
        html: html,
        selectedHtml: filtersGetSelectedItemHTML(
          filter.key,
          filter.name,
          html,
          selectedList
        ),
      };
      filterList.set(filter.key, itemData);
      filteredList.set(filter.key, itemData);
    }
  });
}

function filtersUpdateTags(recipeFilterList, filterList, filteredList) {
  recipeFilterList.forEach((filter) => {
    const value = filterList.get(filter.key);
    filteredList.set(filter.key, value);
  });
}

function filtersSortTagsAll() {
  filtersSortTags(filtersFilteredIngredients, filtersSelectedIngredients);
  filtersSortTags(filtersFilteredAppliances, filtersSelectedAppliances);
  filtersSortTags(filtersFilteredUstensils, filtersSelectedUstensils);
}

function filtersSortTags(filteredList, selectedList) {
  const filtersSelectedList = [];
  const filtersUnselectedList = [];

  filteredList.forEach((item) => {
    if (selectedList.has(item.key)) {
      filtersSelectedList.push(item);
    } else {
      filtersUnselectedList.push(item);
    }
  });

  const sortedSelectedList = filtersSelectedList.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedUnselectedList = filtersUnselectedList.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  filteredList.clear();

  sortedSelectedList.forEach((item) => {
    filteredList.set(item.key, item);
  });

  sortedUnselectedList.forEach((item) => {
    filteredList.set(item.key, item);
  });
}

function filstersGetItemHTML(filterKey, filterValue, selectedList) {
  const li = document.createElement("li");
  li.classList.value = "group";

  const content = document.createElement("div");
  content.classList.value =
    "w-[100%] h-[100%] pl-[16px] pr-[9px] py-[9px] w-[100%] h-[100%] cursor-pointer hover:bg-[#FFD15B] group-[.selected]:bg-[#FFD15B] transition-colors duration-200 ease-in-out flex justify-between items-center";

  const text = document.createElement("div");
  text.textContent = filterValue;

  const crossImg = document.createElement("img");
  crossImg.src = "./img/filter-cross.svg";
  crossImg.alt = "cross";

  const crossButton = document.createElement("button");
  crossButton.appendChild(crossImg);
  crossButton.classList.value = "invisible  group-[.selected]:visible";

  crossButton.addEventListener("click", (e) => {
    e.stopPropagation();
    selectedList.delete(filterKey);
    li.classList.remove("selected");
    searchHandleInputWithTags();
  });

  content.appendChild(text);
  content.appendChild(crossButton);
  li.appendChild(content);

  li.addEventListener("click", () => {
    if (!selectedList.has(filterKey)) {
      li.classList.add("selected");
      selectedList.set(filterKey, filterValue);
    }

    searchHandleInputWithTags();
  });

  return li;
}

function filtersGetSelectedItemHTML(
  filterKey,
  filterValue,
  linkedItem,
  selectedList
) {
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
    linkedItem.classList.remove("selected");
    searchHandleInputWithTags();
  });

  li.appendChild(text);
  li.appendChild(crossBtn);

  return li;
}
