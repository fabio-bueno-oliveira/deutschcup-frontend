import { authenticationTypes } from '../types/authentication';
import { userService } from '../../api/authentication';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const userActions = {
  login,
  logout
};

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.login(email, password)
      .then(
        user => { 
          dispatch(success(user));
          history.push('/admin/home');
          window.location.href = window.location.href;
        },
        error => {
          dispatch(failure(error.toString()));
        }
      );
  };

  function request(user) { return { type: authenticationTypes.LOGIN_REQUEST, user } }
  function success(user) { return { type: authenticationTypes.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: authenticationTypes.LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();
  return { type: authenticationTypes.LOGOUT };
}