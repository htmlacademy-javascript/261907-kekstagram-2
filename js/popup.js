import {isEscape} from './util.js';

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function openPopup (popup, cb, data) {
  if (data && cb) {
    cb(data);
  }

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
    openedForm.reset();
  }
}

export {
  closePopup,
  openPopup
};
