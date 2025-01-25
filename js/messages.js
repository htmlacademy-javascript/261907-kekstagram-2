import {ERROR_SHOW_TIME} from './const';
import { isEscape } from './util';

const createElementFromTemplate = (id) => {
  const template = document.querySelector(`#${id}`)
    .content
    .querySelector(`.${id}`);

  template.classList.add('message');

  return template.cloneNode(true);
};

const removeMessage = (evt) => {
  evt.preventDefault();
  evt.stopPropagation();

  const message = document.querySelector('.message');

  message.remove();
  document.removeEventListener('click', onDocumentClick);
  document.body.removeEventListener('keydown', onBodyKeydown);
};

function onDocumentClick (evt) {
  if (evt.target.closest('[class*="__inner"]')) {
    return;
  }

  removeMessage(evt);
}

function onBodyKeydown (evt) {
  if (isEscape(evt)) {
    removeMessage(evt);
  }
}

const createMessageForUser = (id) => {
  const element = createElementFromTemplate(id);

  return () => {
    document.body.append(element);

    element.addEventListener('click', (evt) => {
      if (evt.target.closest(`.${id}__button`)) {
        removeMessage(evt);
      }
    });

    document.addEventListener('click', onDocumentClick);
    document.body.addEventListener('keydown', onBodyKeydown);
  };
};

const dataErrorElement = createElementFromTemplate('data-error');

const renderDataError = () => {
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ERROR_SHOW_TIME);
};

const renderSuccess = createMessageForUser('success');
const renderError = createMessageForUser('error');

export {
  renderDataError,
  renderError,
  renderSuccess
};
