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

export const usuariosService = {
  getAdmins,
  getUsuarioInfo,
  getPerfilInfo,
  logout
};

function getAdmins() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${BASE_URL}/usuarios/admins`, requestOptions).then(handleResponse);
}

function getUsuarioInfo() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${BASE_URL}/usuario/info`, requestOptions).then(handleResponse);
}

function getPerfilInfo() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${BASE_URL}/perfil/info`, requestOptions).then(handleResponse);
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