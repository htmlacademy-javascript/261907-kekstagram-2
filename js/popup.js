import {chooseUnit, isEscape} from './util.js';

const COMMENTS_PORTION_COUNT = 5;

const popup = document.querySelector('.big-picture');
const closeButton = popup.querySelector('.big-picture__cancel');
const commentsCount = popup.querySelector('.social__comment-count');
const commentsList = popup.querySelector('.social__comments');
const commentsLoader = popup.querySelector('.social__comments-loader');
let currentPhotoComments = null;

const renderCommentsCount = (count, extended) => extended ?
  `<span class="social__comment-shown-count">${COMMENTS_PORTION_COUNT}</span>
  из
  <span class="social__comment-total-count">${count}</span>
  ${chooseUnit(count, 'комментария', 'комментариев', 'комментариев')}
  ` :
  `<span class="social__comment-shown-count">${count}</span>
  ${chooseUnit(count, 'комментарий', 'комментария', 'комментариев')}
  `;

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

const renderCommentsPortion = (comments) => comments.map(renderComment).join('');

const fillPopup = ({url, description, likes, comments}) => {
  const popupImage = popup.querySelector('.big-picture__img img');

  popupImage.src = url;
  popupImage.alt = description;
  popup.querySelector('.social__caption').textContent = description;
  popup.querySelector('.likes-count').textContent = likes;
  currentPhotoComments = {comments, portion: 1};
  commentsList.innerHTML = renderCommentsPortion(currentPhotoComments.comments.slice(0, COMMENTS_PORTION_COUNT));

  if (comments.length > 5) {
    commentsCount.innerHTML = renderCommentsCount(comments.length, true);
    commentsLoader.classList.remove('hidden');
  } else {
    commentsCount.innerHTML = renderCommentsCount(comments.length);
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
  fillPopup(photoData);
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

  const shownCommentsCount = COMMENTS_PORTION_COUNT * currentPhotoComments.portion;
  const requestedCommentsCount = COMMENTS_PORTION_COUNT * ++currentPhotoComments.portion;

  commentsList.insertAdjacentHTML('beforeend', renderCommentsPortion(currentPhotoComments.comments.slice(shownCommentsCount, requestedCommentsCount)));

  commentsCount.querySelector('.social__comment-shown-count').textContent = currentPhotoComments.comments.length < requestedCommentsCount ? currentPhotoComments.comments.length : requestedCommentsCount;

  if (currentPhotoComments.comments.length < requestedCommentsCount) {
    commentsCount.innerHTML = renderCommentsCount(currentPhotoComments.comments.length);
    commentsLoader.classList.add('hidden');
  }
});

export {makePhotoClickHandler};
