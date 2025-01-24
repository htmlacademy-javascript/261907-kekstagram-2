import {getData} from './api.js';
import {renderPhotos} from './render-photos.js';
import {initFilters} from './filters.js';
import {renderDataError} from './messages.js';
import './upload-form.js';

getData()
  .then((photoData) => {
    renderPhotos(photoData);
    initFilters(photoData);
  })
  .catch(() => {
    renderDataError();
  });
