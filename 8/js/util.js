const createIdGenerator = () => {
  let id = 0;

  return () => {
    id++;

    return id;
  };
};

const getRandomIntegerInPositiveRange = (x, y) => {
  const min = Math.ceil(Math.min(Math.abs(x), Math.abs(y)));
  const max = Math.floor(Math.max(Math.abs(x), Math.abs(y)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayElement = (array) => array[getRandomIntegerInPositiveRange(0, array.length - 1)];

const isEscape = (evt) => evt.key === 'Escape';

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

export {
  chooseUnit,
  createIdGenerator,
  getRandomIntegerInPositiveRange,
  getRandomArrayElement,
  isEscape
};
