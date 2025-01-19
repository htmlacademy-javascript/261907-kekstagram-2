import {createPhotoDescriptions} from './data.js';
import {renderPhotos} from './render-photos.js';
import './upload-form.js';

const photoData = createPhotoDescriptions();

renderPhotos(photoData);
