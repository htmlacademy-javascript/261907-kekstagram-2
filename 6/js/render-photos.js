import {createPhotoDescriptions} from './data';

const photoData = createPhotoDescriptions();
const photoContainer = document.querySelector('.pictures');

const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photoContainerFragment = document.createDocumentFragment();

photoData.forEach((it) => {
  const photo = photoTemplate.cloneNode(true);
  const photoImage = photo.querySelector('.picture__img');

  photoImage.src = it.url;
  photoImage.alt = it.description;
  photo.querySelector('.picture__likes').textContent = it.likes;
  photo.querySelector('.picture__comments').textContent = it.comments.length;
  photoContainerFragment.append(photo);
});

photoContainer.append(photoContainerFragment);
