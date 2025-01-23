import {renderPhotos} from './render-photos.js';
import './upload-form.js';
import {getData} from './api.js';
import {renderDataError} from './messages.js';

getData()
  .then((photoData) => {
    renderPhotos(photoData);
  })
  .catch(() => {
    renderDataError();
  });
