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
}

function handleSearchBtnClick() {
    
}

function initSearch() {
  searchInputDOM.addEventListener("input", handleSearchInput);
  searchCrossBtnDOM.addEventListener("click", handleSearchCrossBtnClick);
  searchBtnDOM.addEventListener("click", handleSearchBtnClick);
}
