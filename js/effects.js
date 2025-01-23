import {Filters} from './const.js';

const resetFilter = (sliderContainer, preview, effectsList) => {
  effectsList.querySelector('.effects__radio[value="none"]').checked = true;
  preview.style.filter = '';
  preview.dataset.effect = '';
  sliderContainer.classList.add('hidden');
};

const initEffects = (sliderContainer, preview, effectsList) => {
  const effectLevelInput = sliderContainer.querySelector('.effect-level__value');
  const effectLevelSlider = sliderContainer.querySelector('.effect-level__slider');

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
      resetFilter(sliderContainer, preview, effectsList);

      return;
    }

    const currentLevel = effectLevelSlider.noUiSlider.get();

    preview.style.filter = `${Filters[currentEffect].name}(${currentLevel})`;
    effectLevelInput.value = parseFloat(currentLevel);
  });

  effectsList.addEventListener('change', (evt) => {
    const currentEffect = evt.target.value.toUpperCase();

    if (currentEffect === 'NONE') {
      resetFilter(sliderContainer, preview, effectsList);

      return;
    }

    preview.style.filter = `${Filters[currentEffect].name}(${Filters[currentEffect].level})`;
    preview.dataset.effect = currentEffect;
    sliderContainer.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions(Filters[currentEffect].noUiSliderSettings);
  });
};

export {
  initEffects,
  resetFilter
};
