import {isEscape} from './util';
import {fillPopup} from './fill-popup';

const popup = document.querySelector('.big-picture');
const closeButton = popup.querySelector('.big-picture__cancel');

// временное скрытие
popup.querySelector('.social__comment-count').classList.add('hidden');
popup.querySelector('.comments-loader').classList.add('hidden');

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function openPopup (photoData) {
  fillPopup(popup, photoData);
  popup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePopup () {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeButton.addEventListener('click', closePopup);

const initPopup = (photoData, photo) => {
  photo.addEventListener('click', () => {
    openPopup(photoData);
  });
};

export {initPopup};
