const PHOTO_DESCRIPTIONS_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 30;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;

const PHOTO_DESCRIPTIONS = [
  'Вкусно.',
  'Красиво.',
  'Зимний лес.',
  'Летний луг.',
  'Осенняя дорога.',
  'Весеннее настроение.',
  'С женой.',
  'Скоро в школу!',
  'Отпуск.',
  'Работа, работа, перейди на Федота!',
  'Коты.',
  'Собаки.',
  'Сурикаты.',
  'Дети в зоопарке.',
  'С детьми в зоопарке.',
  'Друг человека.',
  'Лучший дедушка на свете!',
  'С днем рождения меня!',
  'Стоит почитать.',
  'Сомнительное предприятие.',
  'На концерте.',
  'Десять лет в никуда!',
  'Какой стресс, какой стресс!',
  'Большие надежды.',
  'Кошки.'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках, и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота, и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENTATORS_NAMES = [
  'Эдуард',
  'Дарья',
  'Савва',
  'Зоя',
  'Юрий',
  'Татьяна',
  'Егор',
  'Елена',
  'Александр',
  'Анна',
  'Дмитрий',
  'Юлия',
  'Илья',
  'Александра',
  'Михаил',
  'Виктория'
];

const getRandomIntegerInPositiveRange = (x, y) => {
  const min = Math.ceil(Math.min(Math.abs(x), Math.abs(y)));
  const max = Math.floor(Math.max(Math.abs(x), Math.abs(y)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayElement = (array) => array[getRandomIntegerInPositiveRange(0, array.length - 1)];

const createIdGenerator = () => {
  let id = 0;

  return () => {
    id++;

    return id;
  };
};

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

const createPhotoComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomIntegerInPositiveRange(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(COMMENTATORS_NAMES)
});

const createPhotoComments = () => {
  const commentsCount = getRandomIntegerInPositiveRange(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);

  return Array.from({length: commentsCount}, createPhotoComment);
};

const createPhotoDescription = () => {
  const photoId = generatePhotoId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomIntegerInPositiveRange(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: createPhotoComments()
  };
};

const createPhotoDescriptions = () => Array.from({length: PHOTO_DESCRIPTIONS_COUNT}, createPhotoDescription);

createPhotoDescriptions();
