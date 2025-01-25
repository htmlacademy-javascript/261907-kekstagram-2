import {isEscape} from './util.js';
import {resetFilter} from './effects.js';
import {pristine} from './validation.js';

const resetForm = (form) => {
  const preview = form.querySelector('.img-upload__preview img');
  const container = form.querySelector('.img-upload__effect-level');
  const list = form.querySelector('.effects__list');

  pristine.reset();
  form.reset();
  preview.style.transform = '';
  resetFilter(container, preview, list);
};

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function openPopup (popup) {
  popup.classList.remove('hidden');
  popup.classList.add('opened-modal');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePopup () {
  const openedModal = document.querySelector('.opened-modal');

  openedModal.classList.add('hidden');
  openedModal.classList.remove('opened-modal');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  const openedForm = openedModal.closest('form');

  if (openedForm) {
    resetForm(openedForm);
  }
}

export {
  closePopup,
  openPopup,
  resetForm
};
