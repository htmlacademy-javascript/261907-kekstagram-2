import {URL, Methods, Routes} from './const';

const load = (route, method = Methods.GET, body = null) => fetch(
  `${URL}${route}`,
  {
    method,
    body
  }
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error();
  })
  .catch(() => {
    throw new Error();
  });

const getData = () => load(Routes.GET_DATA);

const sendData = (body) => load(Routes.SEND_DATA, Methods.POST, body);

export {
  getData,
  sendData
};
