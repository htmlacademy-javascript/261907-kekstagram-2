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

export {
  createIdGenerator,
  getRandomIntegerInPositiveRange,
  getRandomArrayElement,
  isEscape
};
