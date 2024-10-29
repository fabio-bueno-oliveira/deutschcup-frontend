import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const BASE_URL = "https://deutschcup-a6b22e51057c.herokuapp.com";

export function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return {};
  }
}

export const miscService = {
  getPaises,
  getEstados,
  getCidades,
  logout
};

function getPaises() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${BASE_URL}/endereco/paises`, requestOptions).then(handleResponse);
}

function getEstados(countryId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${BASE_URL}/endereco/estados/${countryId}`, requestOptions).then(handleResponse);
}

function getCidades(regionId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${BASE_URL}/endereco/cidades/${regionId}`, requestOptions).then(handleResponse);
}

function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          logout();
          history.push('/');
          window.location.href = window.location.href;
        }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}