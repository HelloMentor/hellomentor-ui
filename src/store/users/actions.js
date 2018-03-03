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

export function fetchUser(id) {
}

export function setLoggedInUser(user) {
  return dispatch => {
    dispatch({ type: types.LIU_SET, user });
  }
}
