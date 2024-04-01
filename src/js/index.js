async function initAsync() {
  await initRecipeAsync();
  initSearch();
  initFilters();
}

initAsync();
