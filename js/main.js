import {renderPhotos} from './render-photos.js';
import './upload-form.js';
import {getData} from './api.js';
import {renderError} from './error.js';

getData()
  .then((photoData) => {
    renderPhotos(photoData);
  })
  .catch(() => {
    renderError();
  });
