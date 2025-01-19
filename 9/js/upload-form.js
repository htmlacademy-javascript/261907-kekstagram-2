import {closePopup, openPopup} from './popup.js';
import {ignoreEscapeKeydown} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadPopup = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadPopup.querySelector('.img-upload__cancel');
const hashtagsField = uploadPopup.querySelector('.text__hashtags');
const commentField = uploadPopup.querySelector('.text__description');
const submitButton = uploadPopup.querySelector('.img-upload__submit');

uploadInput.addEventListener('change', () => {
  openPopup(uploadPopup);
});

closeButton.addEventListener('click', closePopup);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(hashtagsField, (value) => {
  const hashtags = value.trim().split(' ');

  return !value || hashtags.every((it) => /^#[a-zа-яё0-9]{1,19}$/i.test(it));
}, 'Введён невалидный хэштег');

pristine.addValidator(hashtagsField, (value) => value.trim().split(' ').length <= 5, 'Превышено количество хэштегов');

pristine.addValidator(hashtagsField, (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  const hashtagsSet = new Set(hashtags);

  return !value || hashtags.length === hashtagsSet.size;
}, 'Хэштеги повторяются');

hashtagsField.addEventListener('keydown', ignoreEscapeKeydown);
commentField.addEventListener('keydown', ignoreEscapeKeydown);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});
