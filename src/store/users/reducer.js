import * as types from './actionTypes';

const initialState = {
  usersById: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.USERS_FETCHED:
      return {
        ...state,
        usersById: action.usersById
      }
    default:
      return state;
  }
}
