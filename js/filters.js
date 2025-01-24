import {DEBOUNCE_DELAY, RANDOM_PHOTOS_COUNT, SortControls} from './const';
import {renderPhotos} from './render-photos';
import {debounce, shuffleArray} from './util';

const filtersSection = document.querySelector('.img-filters');
const filtersForm = filtersSection.querySelector('.img-filters__form');
let activeFilterButton = filtersForm.querySelector('.img-filters__button--active');
let filteredPhotos = null;

const comparePopularity = (photoA, photoB) => {
  const commentsCountA = photoA.comments.length;
  const commentsCountB = photoB.comments.length;

  return commentsCountB - commentsCountA;
};

const initFilters = (photoData) => {
  filtersSection.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    const filterButton = evt.target.closest('.img-filters__button');


    if (!filterButton || filterButton === activeFilterButton) {
      return;
    }

    const filterValue = filterButton.id;

    switch (filterValue) {
      case SortControls.RANDOM:
        filteredPhotos = shuffleArray(photoData, RANDOM_PHOTOS_COUNT);

        break;
      case SortControls.DISCUSSED:
        filteredPhotos = photoData.slice().sort(comparePopularity);

        break;
      default:
        filteredPhotos = photoData;
    }

    activeFilterButton.classList.remove('img-filters__button--active');
    filterButton.classList.add('img-filters__button--active');
    activeFilterButton = filterButton;

    debounce(() => {
      renderPhotos(filteredPhotos);
    }, DEBOUNCE_DELAY)();
  });
};

export {initFilters};
