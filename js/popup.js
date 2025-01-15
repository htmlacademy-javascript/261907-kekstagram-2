import {chooseUnit, isEscape} from './util.js';

const INITIAL_SHOWN_COMMENTS_COUNT = 5;

const popup = document.querySelector('.big-picture');
const closeButton = popup.querySelector('.big-picture__cancel');
const commentsCount = popup.querySelector('.social__comment-count');
const commentsList = popup.querySelector('.social__comments');
const commentsLoader = popup.querySelector('.social__comments-loader');

const renderComment = ({avatar, name, message}, i) => `
  <li class="social__comment${i > 4 ? '  hidden' : ''}">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>
`;

const fillPopup = ({url, description, likes, comments}) => {
  const popupImage = popup.querySelector('.big-picture__img img');

  popupImage.src = url;
  popupImage.alt = description;
  popup.querySelector('.social__caption').textContent = description;
  popup.querySelector('.likes-count').textContent = likes;
  commentsList.innerHTML = comments.map(renderComment).join('');
  commentsLoader.dataset.portion = 1;

  if (comments.length > 5) {
    commentsCount.innerHTML = `
      <span class="social__comment-shown-count">${INITIAL_SHOWN_COMMENTS_COUNT}</span>
      из
      <span class="social__comment-total-count">${comments.length}</span>
      ${chooseUnit(comments.length, 'комментария', 'комментариев', 'комментариев')}
    `;

    commentsLoader.classList.remove('hidden');
  } else {
    commentsCount.innerHTML = `
      <span class="social__comment-shown-count">${comments.length}</span>
      ${chooseUnit(comments.length, 'комментарий', 'комментария', 'комментариев')}
    `;

    commentsLoader.classList.add('hidden');
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function openPopup (photoData) {
  fillPopup(popup, photoData);
  popup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePopup () {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeButton.addEventListener('click', closePopup);

const makePhotoClickHandler = (photoData) => (evt) => {
  const photo = evt.target.closest('.picture');

  if (!photo) {
    return;
  }

  evt.preventDefault();

  const photoId = Number(photo.dataset.id);
  const requestedPhotoData = photoData.find((it) => it.id === photoId);

  if (requestedPhotoData) {
    openPopup(requestedPhotoData);
  }
};

commentsLoader.addEventListener('click', (evt) => {
  evt.preventDefault();

  let commentPortion = Number(commentsLoader.dataset.portion);

  const shownCommentsCount = INITIAL_SHOWN_COMMENTS_COUNT * commentPortion;
  const requestedCommentsCount = INITIAL_SHOWN_COMMENTS_COUNT * ++commentPortion;
  const comments = commentsList.children;

  for (let i = shownCommentsCount; i < requestedCommentsCount; i++) {
    comments[i]?.classList.remove('hidden');
  }

  commentsCount.querySelector('.social__comment-shown-count').textContent = comments.length < requestedCommentsCount ? comments.length : requestedCommentsCount;
  commentsLoader.dataset.portion = commentPortion;

  if (comments.length < requestedCommentsCount) {
    commentsLoader.classList.add('hidden');
  }
});

export {makePhotoClickHandler};
