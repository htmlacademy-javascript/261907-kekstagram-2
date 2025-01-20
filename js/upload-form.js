import {closePopup, openPopup} from './popup.js';
import {ignoreEscapeKeydown} from './util.js';

const SCALE_STEP = 25;
const FIRST_STEP = 1;
const LAST_STEP = 4;
const DEFAULT_SCALE = 4;

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadPopup = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadPopup.querySelector('.img-upload__cancel');
const previewScale = uploadPopup.querySelector('.img-upload__scale');
const previewScaleInput = previewScale.querySelector('.scale__control--value');
const uploadPreview = uploadPopup.querySelector('.img-upload__preview img');
const effectsList = uploadPopup.querySelector('.effects__list');
const effects = Array.from(effectsList.querySelectorAll('.effects__preview'));
const hashtagsField = uploadPopup.querySelector('.text__hashtags');
const commentField = uploadPopup.querySelector('.text__description');
const submitButton = uploadPopup.querySelector('.img-upload__submit');
let currentScale = DEFAULT_SCALE;

const fillUploadPopup = () => {
  const imageSrc = URL.createObjectURL(uploadInput.files[0]);

  uploadPreview.src = imageSrc;

  effects.forEach((it) => {
    it.style.backgroundImage = `url('${imageSrc}')`;
  });
};

uploadInput.addEventListener('change', () => {
  openPopup(uploadPopup);
  fillUploadPopup();
});

closeButton.addEventListener('click', closePopup);

previewScale.addEventListener('click', (evt) => {
  const scaleButton = evt.target.closest('button.scale__control');

  if (!scaleButton) {
    return;
  }

  const scaleRequest = scaleButton.classList.contains('scale__control--smaller') ? -1 : 1;

  currentScale += scaleRequest;

  if (currentScale > LAST_STEP) {
    currentScale = LAST_STEP;
  } else if (currentScale < FIRST_STEP) {
    currentScale = FIRST_STEP;
  }

  previewScaleInput.value = `${currentScale * SCALE_STEP}%`;
  uploadPreview.style.transform = `scale(${currentScale / LAST_STEP})`;
});

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
