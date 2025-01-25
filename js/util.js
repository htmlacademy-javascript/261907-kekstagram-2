const beautifyValue = (value) => value.trim().replace(/ {2,}/g, ' ');

const chooseUnit = (number, single, firstPlural, secondPlural) => {
  if (number > 4 && number < 21) {
    return secondPlural;
  }
  const excess = number % 10;

  switch (excess) {
    case 1:
      return single;
    case 2:
    case 3:
    case 4:
      return firstPlural;
    default:
      return secondPlural;
  }
};

const createIdGenerator = () => {
  let id = 0;

  return () => {
    id++;

    return id;
  };
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

  };
};

const getRandomIntegerInPositiveRange = (x, y) => {
  const min = Math.ceil(Math.min(Math.abs(x), Math.abs(y)));
  const max = Math.floor(Math.max(Math.abs(x), Math.abs(y)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayElement = (array) => array[getRandomIntegerInPositiveRange(0, array.length - 1)];

const isEscape = (evt) => evt.key === 'Escape';

const ignoreEscapeKeydown = (evt) => {
  if (isEscape) {
    evt.stopPropagation();
  }
};

const shuffleArray = (array, length = array.length) => {
  const sourceArray = array.slice();
  const resultArray = [];
  let requiredLength = length;

  while (sourceArray.length && requiredLength > 0) {
    const randomIndex = getRandomIntegerInPositiveRange(0, sourceArray.length - 1);

    resultArray.push(sourceArray.splice(randomIndex - 1, 1)[0]);
    requiredLength--;
  }

  return resultArray;
};

export {
  beautifyValue,
  chooseUnit,
  createIdGenerator,
  debounce,
  getRandomIntegerInPositiveRange,
  getRandomArrayElement,
  ignoreEscapeKeydown,
  isEscape,
  shuffleArray
};
