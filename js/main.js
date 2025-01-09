import {createPhotoDescriptions} from './data';
import {renderPhotos} from './render-photos';

const photoData = createPhotoDescriptions();

renderPhotos(photoData);
