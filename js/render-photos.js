import {openPhoto} from './big-picture.js';

let photoData = null;

const photoContainer = document.querySelector('.pictures');

const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photoContainerFragment = document.createDocumentFragment();

const onPhotoClick = (evt) => {
  const photo = evt.target.closest('.picture');

  if (!photo || !photoData) {
    return;
  }

  evt.preventDefault();

  const photoId = Number(photo.dataset.id);
  const requestedPhotoData = photoData.find((it) => it.id === photoId);

  if (requestedPhotoData) {
    openPhoto(requestedPhotoData);
  }
};

const clearContainer = () => {
  Array.from(photoContainer.querySelectorAll('.picture')).forEach((it) => {
    it.remove();
  });
};

const renderPhotos = (data) => {
  clearContainer();
  photoData = data;

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
};

photoContainer.addEventListener('click', onPhotoClick);

export {renderPhotos};
