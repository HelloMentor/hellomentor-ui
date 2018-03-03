import { getAllUsers } from '../../services/users';
import * as types from './actionTypes'
import keyBy from 'lodash/keyBy';

export function fetchAllUsers() {
  return dispatch => {
    fetch(process.env.REACT_APP_API_URL + '/users-list', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(users => {
      console.log(users);
      const usersById = keyBy(users, 'id');
      dispatch({type: types.USERS_FETCHED, usersById})
    });
  }
}

export function fetchUser(id) {
}
