import {FILE_TYPES, Steps} from './const.js';
import {closePopup, openPopup, resetForm} from './popup.js';
import {initEffects} from './effects.js';
import {addValidators} from './validators.js';
import {ignoreEscapeKeydown} from './util.js';
import {sendData} from './api.js';
import {renderError, renderSuccess} from './messages.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadPopup = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadPopup.querySelector('.img-upload__cancel');
const previewScale = uploadPopup.querySelector('.img-upload__scale');
const previewScaleInput = previewScale.querySelector('.scale__control--value');
const uploadPreview = uploadPopup.querySelector('.img-upload__preview img');
const effectLevelContainer = uploadPopup.querySelector('.img-upload__effect-level');
const effectsList = uploadPopup.querySelector('.effects__list');
const effects = Array.from(effectsList.querySelectorAll('.effects__preview'));
const hashtagsField = uploadPopup.querySelector('.text__hashtags');
const commentField = uploadPopup.querySelector('.text__description');
const submitButton = uploadPopup.querySelector('.img-upload__submit');
let currentScale = Steps.DEFAULT;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const fillUploadPopup = (imageSrc) => {
  uploadPreview.src = imageSrc;

  effects.forEach((it) => {
    it.style.backgroundImage = `url('${imageSrc}')`;
  });
};

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const isTypeAccepted = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isTypeAccepted) {
    const imageSrc = URL.createObjectURL(uploadInput.files[0]);

    openPopup(uploadPopup);
    fillUploadPopup(imageSrc);
  }
});

closeButton.addEventListener('click', closePopup);

previewScale.addEventListener('click', (evt) => {
  const scaleButton = evt.target.closest('button.scale__control');

  if (!scaleButton) {
    return;
  }

  const scaleRequest = scaleButton.classList.contains('scale__control--smaller') ? -1 : 1;

  currentScale += scaleRequest;

  if (currentScale > Steps.LAST) {
    currentScale = Steps.LAST;
  } else if (currentScale < Steps.FIRST) {
    currentScale = Steps.FIRST;
  }

  previewScaleInput.value = `${currentScale * Steps.VALUE}%`;
  uploadPreview.style.transform = `scale(${currentScale / Steps.LAST})`;
});

initEffects(effectLevelContainer, uploadPreview, effectsList);
addValidators(pristine, hashtagsField, commentField);
hashtagsField.addEventListener('keydown', ignoreEscapeKeydown);
commentField.addEventListener('keydown', ignoreEscapeKeydown);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitButton.disabled = true;

  const isValid = pristine.validate();

  if (isValid) {
    sendData(new FormData(uploadForm))
      .then(() => {
        closePopup();
        resetForm(uploadForm);
        renderSuccess();
      })
      .catch(() => {
        renderError();
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  }
});
