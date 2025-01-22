import {ERROR_SHOW_TIME} from './const';

const errorTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

const errorElement = errorTemplate.cloneNode(true);

const renderError = () => {
  document.body.append(errorElement);

  const errorTimeout = setTimeout(() => {
    errorElement.remove();
    clearTimeout(errorTimeout);
  }, ERROR_SHOW_TIME);
};

export {renderError};
