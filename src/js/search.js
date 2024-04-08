const searchDOM = document.querySelector(".search");
const searchInputDOM = searchDOM.querySelector(".search__input");
const searchBtnDOM = searchDOM.querySelector(".search__btn");
const searchCrossBtnDOM = searchDOM.querySelector(".search__cross-btn");

function handleSearchInput() {
  const valueLength = searchInputDOM.value.length;

  if (valueLength > 1) {
    return;
  }

  if (valueLength > 0) {
    searchCrossBtnDOM.classList.remove("hidden");
  } else {
    searchCrossBtnDOM.classList.add("hidden");
  }
}

function handleSearchCrossBtnClick() {
  searchInputDOM.value = "";
  searchCrossBtnDOM.classList.add("hidden");
  handleSearchBtnClick();
}

function handleSearchBtnClick() {
  searchHandleInputWithTags();
}

function searchHandleSearchInput() {
  const value = searchInputDOM.value.toLowerCase();

  if (value.length === 0) {
    applyFiltering(recipeDataList);
    return;
  }

  if (value.length < 3) {
    return;
  }

  const filteredData = recipeDataList.filter((recipeData) =>
    recipeData.content.includes(value)
  );

  applyFiltering(filteredData);
}

function searchHandleTags() {
  const ingredientTagKeys = [...filtersSelectedIngredients.keys()];
  const appliancesTagKeys = [...filtersSelectedAppliances.keys()];
  const ustensilsTagKeys = [...filtersSelectedUstensils.keys()];

  const filtredData = recipeFilteredDataList.filter((recipeData) => {
    if (
      ingredientTagKeys.length == 0 &&
      appliancesTagKeys.length == 0 &&
      ustensilsTagKeys.length == 0
    ) {
      return true;
    }

    const ingredientsExist = ingredientTagKeys.every((ingredientKey) =>
      recipeData.ingredients
        .map((ingredient) => ingredient.key)
        .includes(ingredientKey)
    );

    const appliancesExist = appliancesTagKeys.every((applianceKey) =>
      recipeData.appliances
        .map((appliance) => appliance.key)
        .includes(applianceKey)
    );

    const ustensilsExist = ustensilsTagKeys.every((ustensilKey) =>
      recipeData.ustensils.map((ustensil) => ustensil.key).includes(ustensilKey)
    );

    return ingredientsExist && appliancesExist && ustensilsExist;
  });

  applyFiltering(filtredData);
}

function searchHandleInputWithTags() {
  searchHandleSearchInput();
  searchHandleTags();
  filtersUpdateTagsAll();
  filtersSortTagsAll();
  updateRecipeListDOM();
  filtersUpdateAllDOM();
  filtersUpdateSelectedAllDOM();
}

function initSearch() {
  searchInputDOM.addEventListener("input", handleSearchInput);
  searchCrossBtnDOM.addEventListener("click", handleSearchCrossBtnClick);
  searchBtnDOM.addEventListener("click", handleSearchBtnClick);
}
