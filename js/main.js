import {DEBOUNCE_DELAY} from './const.js';
import {getData} from './api.js';
import {renderPhotos} from './render-photos.js';
import {initFilters, setFiltersClick} from './filters.js';
import {debounce} from './util.js';
import {renderDataError} from './messages.js';
import './upload-form.js';

getData()
  .then((photoData) => {
    renderPhotos(photoData);
    initFilters();
    setFiltersClick(debounce(() => renderPhotos(photoData), DEBOUNCE_DELAY));
  })
  .catch(() => {
    renderDataError();
  });
