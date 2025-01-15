import {createPhotoDescriptions} from './data.js';
import {renderPhotos} from './render-photos.js';

const photoData = createPhotoDescriptions();

renderPhotos(photoData);
