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
  const ingredientTags = [...filtersSelectedIngredients];
  const filtredData = recipeFilteredDataList.filter((recipeData) => {
    if(ingredientTags.length == 0) {
      return true;
    }

    const recipeIngredients = recipeData.data.ingredients.map(
      (ingredient) => ingredient.ingredient.toLowerCase()
    );

    return ingredientTags.every(ingredient => recipeIngredients.includes(ingredient.toLowerCase()));
  });

  applyFiltering(filtredData);
}

function searchHandleInputWithTags() {
  searchHandleSearchInput();
  searchHandleTags();
  filtersUpdateTags();
  updateRecipeListDOM();
  filtersUpdateDOM();
}

function initSearch() {
  searchInputDOM.addEventListener("input", handleSearchInput);
  searchCrossBtnDOM.addEventListener("click", handleSearchCrossBtnClick);
  searchBtnDOM.addEventListener("click", handleSearchBtnClick);
}
