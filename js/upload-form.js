import {Filters, Steps} from './const.js';
import {closePopup, openPopup} from './popup.js';
import {ignoreEscapeKeydown} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadPopup = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadPopup.querySelector('.img-upload__cancel');
const previewScale = uploadPopup.querySelector('.img-upload__scale');
const previewScaleInput = previewScale.querySelector('.scale__control--value');
const uploadPreview = uploadPopup.querySelector('.img-upload__preview img');
const effectLevelContainer = uploadPopup.querySelector('.img-upload__effect-level');
const effectLevelInput = effectLevelContainer.querySelector('.effect-level__value');
const effectLevelSlider = effectLevelContainer.querySelector('.effect-level__slider');
const effectsList = uploadPopup.querySelector('.effects__list');
const effects = Array.from(effectsList.querySelectorAll('.effects__preview'));
const hashtagsField = uploadPopup.querySelector('.text__hashtags');
const commentField = uploadPopup.querySelector('.text__description');
const submitButton = uploadPopup.querySelector('.img-upload__submit');
let currentScale = Steps.DEFAULT;

const fillUploadPopup = () => {
  const imageSrc = URL.createObjectURL(uploadInput.files[0]);

  uploadPreview.src = imageSrc;

  effects.forEach((it) => {
    it.style.backgroundImage = `url('${imageSrc}')`;
  });
};

const resetFilter = () => {
  effectsList.querySelector('.effects__radio[value="none"]').checked = true;
  uploadPreview.style.filter = '';
  uploadPreview.dataset.effect = '';
  effectLevelContainer.classList.add('hidden');
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

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

  if (currentScale > Steps.LAST) {
    currentScale = Steps.LAST;
  } else if (currentScale < Steps.FIRST) {
    currentScale = Steps.FIRST;
  }

  previewScaleInput.value = `${currentScale * Steps.VALUE}%`;
  uploadPreview.style.transform = `scale(${currentScale / Steps.LAST})`;
});

noUiSlider.create(effectLevelSlider, {
  ...Filters.CHROME.noUiSliderSettings,
  connect: 'lower',
  format: {
    to: (value) => {
      const currentEffect = effectsList.querySelector('.effects__radio:checked').value;

      switch (currentEffect) {
        case 'chrome':
        case 'sepia':
        case 'heat':
          return value.toFixed(1);
        case 'marvin':
          return `${value}%`;
        case 'phobos':
          return `${value.toFixed(1)}px`;
      }
    },
    from: (value) => parseFloat(value)
  }
});

effectLevelSlider.noUiSlider.on('update', () => {
  const currentEffect = effectsList.querySelector('.effects__radio:checked').value.toUpperCase();

  if (currentEffect === 'NONE') {
    resetFilter();

    return;
  }

  const currentLevel = effectLevelSlider.noUiSlider.get();

  uploadPreview.style.filter = `${Filters[currentEffect].name}(${currentLevel})`;
  effectLevelInput.value = parseFloat(currentLevel);
});

effectsList.addEventListener('change', (evt) => {
  const currentEffect = evt.target.value.toUpperCase();

  if (currentEffect === 'NONE') {
    resetFilter();

    return;
  }

  uploadPreview.style.filter = `${Filters[currentEffect].name}(${Filters[currentEffect].level})`;
  uploadPreview.dataset.effect = currentEffect;
  effectLevelContainer.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions(Filters[currentEffect].noUiSliderSettings);
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

pristine.addValidator(commentField, (value) => !value || value.length <= 140, 'Превышено количество символов');

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
