import * as types from './actionTypes';

const initialState = {
  usersById: {},
  usersArray: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.USERS_FETCHED:
      return {
        ...state,
        usersById: action.usersById,
        usersArray: Object.keys(action.usersById).length ? Object.values(action.usersById) : []
      }
    case types.LIU_SET:
      return {
        ...state,
        liu: action.user
      }
    default:
      return state;
  }
}
