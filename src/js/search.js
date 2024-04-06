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
  const tagKeys = [...filtersSelectedIngredients.keys()];
  const filtredData = recipeFilteredDataList.filter((recipeData) => {
    if (tagKeys.length == 0) {
      return true;
    }

    return tagKeys.every((ingredientKey) =>
      recipeData.ingredients
        .map((ingredient) => ingredient.key)
        .includes(ingredientKey)
    );
  });

  applyFiltering(filtredData);
}

function searchHandleInputWithTags() {
  searchHandleSearchInput();
  searchHandleTags();
  filtersUpdateTags();
  updateRecipeListDOM();
  filtersUpdateDOM();
  filtersUpdateSelectedDOM();
}

function initSearch() {
  searchInputDOM.addEventListener("input", handleSearchInput);
  searchCrossBtnDOM.addEventListener("click", handleSearchCrossBtnClick);
  searchBtnDOM.addEventListener("click", handleSearchBtnClick);
}
