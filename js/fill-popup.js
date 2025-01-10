const INITIAL_SHOWN_COMMENTS_COUNT = 5;

const renderComment = ({avatar, name, message}) => `
  <li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>
`;

const fillPopup = (popup, {url, description, likes, comments}) => {
  const popupImage = popup.querySelector('.big-picture__img img');

  popupImage.src = url;
  popupImage.alt = description;
  popup.querySelector('.social__caption').textContent = description;
  popup.querySelector('.likes-count').textContent = likes;
  popup.querySelector('.social__comment-shown-count').textContent = INITIAL_SHOWN_COMMENTS_COUNT;
  popup.querySelector('.social__comment-total-count').textContent = comments.length;
  popup.querySelector('.social__comments').innerHTML = comments.map(renderComment).join('');
};

export {fillPopup};
