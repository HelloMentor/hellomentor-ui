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

export function fetchLoggedInUser(userId, token) {
  return dispatch => {
    return services.getFullyAuthedUser(userId, token)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        return res.json();
      })
      .then(user => {
        dispatch({ type: types.SET_LIU, user });
        return user;
      })
      .catch(err => {
        throw err;
      });
  }
}

export function signup(user) {
  return dispatch => {
    return services.signup(user)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        return res.json();
      })
      .then(user => {
        localStorage.setItem('liu', JSON.stringify(user));
        dispatch({ type: types.SIGNUP, user });
      })
      .catch(err => {
        throw err;
      });
  }
}

export function login(user) {
  return dispatch => {
    // send back promise so we can take user to next page after login
    return services.login(user)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        return res.json();
      })
      .then(user => {
        localStorage.setItem('liu', JSON.stringify(user));
        dispatch({ type: types.LOGIN, user });
      })
      .catch(err => {
        throw err;
      });
  }
}

export function logout(user) {
  return dispatch => {
    localStorage.removeItem('liu');
    dispatch({ type: types.LOGOUT });
  }
}

export function updateUser(user, profileImage) {
  return dispatch => {
    // send back promise so we can take user to next page after update
    return services.updateUser(user, profileImage)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        return res.json();
      })
      .then(user => {
        localStorage.setItem('liu', JSON.stringify(user));
        dispatch({ type: types.UPDATE_LIU, user });
      })
      .catch(err => {
        throw err;
      });
  }
}

export function addChannelToLiu(channel, liu) {
  return dispatch => {
    liu.channels.push(channel);
    localStorage.setItem('liu', JSON.stringify({ user: liu }));
    dispatch({ type: types.ADD_CHANNEL_TO_LIU, channel: channel.channel });
  }
}
