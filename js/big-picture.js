import {COMMENT_TEMPLATE} from './const.js';
import {closePopup, openPopup} from './popup.js';
import {chooseUnit} from './util.js';

const COMMENTS_PORTION_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
let currentPhotoComments = null;

const renderCommentsCount = (currentPortion, count) => `<span class="social__comment-shown-count">${currentPortion < count ? currentPortion : count}</span>
  из
  <span class="social__comment-total-count">${count}</span>
  ${chooseUnit(count, 'комментария', 'комментариев', 'комментариев')}
`;

const renderCommentsPortion = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach(({avatar, name, message}) => {
    const comment = document.createElement('li');

    comment.classList.add('social__comment');
    comment.insertAdjacentHTML('beforeend', COMMENT_TEMPLATE);

    const commentAvatar = comment.querySelector('.social__picture');

    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    comment.querySelector('.social__text').textContent = message;
    commentsFragment.append(comment);
  });

  return commentsFragment;
};

const fillbigPicture = ({url, description, likes, comments}) => {
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');

  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  currentPhotoComments = {comments, portion: 1};
  commentsCount.innerHTML = renderCommentsCount(COMMENTS_PORTION_COUNT, comments.length);
  commentsList.innerHTML = '';
  commentsList.append(renderCommentsPortion(currentPhotoComments.comments.slice(0, COMMENTS_PORTION_COUNT)));

  if (comments.length > 5) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
};

const onCloseButtonClick = () => {
  closePopup();
};

closeButton.addEventListener('click', onCloseButtonClick);

const openPhoto = (photoData) => {
  fillbigPicture(photoData);
  openPopup(bigPicture);
};

commentsLoader.addEventListener('click', (evt) => {
  evt.preventDefault();

  const shownCommentsCount = COMMENTS_PORTION_COUNT * currentPhotoComments.portion;
  const requestedCommentsCount = COMMENTS_PORTION_COUNT * ++currentPhotoComments.portion;

  commentsList.append(renderCommentsPortion(currentPhotoComments.comments.slice(shownCommentsCount, requestedCommentsCount)));
  commentsCount.querySelector('.social__comment-shown-count').textContent = currentPhotoComments.comments.length < requestedCommentsCount ? currentPhotoComments.comments.length : requestedCommentsCount;
  commentsCount.innerHTML = renderCommentsCount(requestedCommentsCount, currentPhotoComments.comments.length);

  if (currentPhotoComments.comments.length < requestedCommentsCount) {
    commentsLoader.classList.add('hidden');
  }
});

export {openPhoto};
