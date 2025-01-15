import {makePhotoClickHandler} from './popup.js';

const photoContainer = document.querySelector('.pictures');

const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photoContainerFragment = document.createDocumentFragment();

const renderPhotos = (photoData) => {
  photoData.forEach((it) => {
    const photo = photoTemplate.cloneNode(true);
    const photoImage = photo.querySelector('.picture__img');

    photo.dataset.id = it.id;
    photoImage.src = it.url;
    photoImage.alt = it.description;
    photo.querySelector('.picture__likes').textContent = it.likes;
    photo.querySelector('.picture__comments').textContent = it.comments.length;
    photoContainerFragment.append(photo);
  });

  photoContainer.append(photoContainerFragment);
  photoContainer.addEventListener('click', makePhotoClickHandler(photoData));
};

export {renderPhotos};
