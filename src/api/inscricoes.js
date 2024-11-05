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

export const inscricoesService = {
  getInscricoes,
  getInscritos,
  getPreInscricoes,
  getInscricaoDetalhe,
  logout
};

function getInscricoes() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${BASE_URL}/inscricoes`, requestOptions).then(handleResponse);
}

function getInscritos() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${BASE_URL}/inscritos`, requestOptions).then(handleResponse);
}

function getPreInscricoes() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${BASE_URL}/preinscricoes`, requestOptions).then(handleResponse);
}

function getInscricaoDetalhe(inscricaoId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${BASE_URL}/inscricao/${inscricaoId}`, requestOptions).then(handleResponse);
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