const filtersSection = document.querySelector('.img-filters');
const filtersForm = filtersSection.querySelector('.img-filters__form');
let activeFilterButton = filtersForm.querySelector('.img-filters__button--active');

const initFilters = () => {
  filtersSection.classList.remove('img-filters--inactive');
};

const setFiltersClick = (cb) => {
  filtersForm.addEventListener('click', (evt) => {
    const filterButton = evt.target.closest('.img-filters__button');


    if (!filterButton || filterButton === activeFilterButton) {
      return;
    }

    activeFilterButton.classList.remove('img-filters__button--active');
    filterButton.classList.add('img-filters__button--active');
    activeFilterButton = filterButton;
    cb();
  });
};

export {
  initFilters,
  setFiltersClick
};
