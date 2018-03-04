import * as services from '../../services/users';
import * as types from './actionTypes'
import keyBy from 'lodash/keyBy';

export function fetchAllUsers() {
  return dispatch => {
    services.getAllUsers()
      .then(res => res.json())
      .then(users => {
        const usersById = keyBy(users, 'id');
        dispatch({ type: types.USERS_FETCHED, usersById });
      });
  }
}

export function setLoggedInUser(user) {
  return dispatch => {
    dispatch({ type: types.SET_LIU, user });
  }
}

export function login(user) {
  return dispatch => {
    // send back promise so we can take user to next page after login
    return services.login(user)
      .then(res => res.json())
      .then(user => {
        localStorage.setItem('liu', JSON.stringify(user));
        dispatch({ type: types.LOGIN, user });
      });
  }
}

export function logout(user) {
  return dispatch => {
    localStorage.removeItem('liu');
    dispatch({ type: types.LOGOUT });
  }
}
