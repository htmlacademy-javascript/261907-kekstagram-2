import {beautifyValue, ignoreEscapeKeydown} from './util';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const onFieldInput = (evt) => {
  if (evt.target === hashtagsField || evt.target === commentField) {
    const isValid = pristine.validate();

    submitButton.disabled = !isValid;
  }
};

const onFieldKeydown = (evt) => {
  ignoreEscapeKeydown(evt);
};

pristine.addValidator(hashtagsField, (value) => {
  const hashtags = beautifyValue(value).split(' ');

  return !value || hashtags.every((it) => /^#[a-zа-яё0-9]{1,19}$/i.test(it));
}, 'Введён невалидный хэштег');

pristine.addValidator(hashtagsField, (value) => !value || beautifyValue(value).split(' ').length <= 5, 'Превышено количество хэштегов');

pristine.addValidator(hashtagsField, (value) => {
  const hashtags = beautifyValue(value).toLowerCase().split(' ');
  const hashtagsSet = new Set(hashtags);

  return !value || hashtags.length === hashtagsSet.size;
}, 'Хэштеги повторяются');

pristine.addValidator(commentField, (value) => !value || value.length <= 140, 'Длина комментария больше 140 символов');

uploadForm.addEventListener('input', onFieldInput);
hashtagsField.addEventListener('keydown', onFieldKeydown);
commentField.addEventListener('keydown', onFieldKeydown);

export {pristine};
