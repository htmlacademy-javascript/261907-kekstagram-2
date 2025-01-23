const addValidators = (pristine, hashtagsField, commentField) => {
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

  pristine.addValidator(commentField, (value) => !value || value.length <= 140, 'Длина комментария больше 140 символов');
};

export {addValidators};
