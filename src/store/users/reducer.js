import * as types from './actionTypes';

const initialState = {
  usersById: {},
  usersArray: [],
  liu: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.USERS_FETCHED:
      return {
        ...state,
        usersById: action.usersById,
        usersArray: Object.keys(action.usersById).length ? Object.values(action.usersById) : []
      }
    case types.SET_LIU:
      return {
        ...state,
        liu: action.user.user
      }
    case types.LOGIN:
      return {
        ...state,
        liu: action.user.user
      }
    case types.LOGOUT:
      return {
        ...state,
        liu: {}
      }
    default:
      return state;
  }
}
