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

  const message = document.querySelector('.message');

  message.remove();
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentClick (evt) {
  if (evt.target.closest('.messages > div')) {
    return;
  }

  removeMessage(evt);
}

function onDocumentKeydown (evt) {
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
    document.addEventListener('keydown', onDocumentKeydown);
  };
};

const dataErrorElement = createElementFromTemplate('data-error');

const renderDataError = () => {
  document.body.append(dataErrorElement);

  const dataErrorTimeout = setTimeout(() => {
    dataErrorElement.remove();
    clearTimeout(dataErrorTimeout);
  }, ERROR_SHOW_TIME);
};

const renderSuccess = createMessageForUser('success');
const renderError = createMessageForUser('error');

export {
  renderDataError,
  renderError,
  renderSuccess
};
