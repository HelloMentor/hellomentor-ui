import * as types from './actionTypes';

const initialState = {
  token: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_CHAT_TOKEN:
      return {
        ...state,
        token: action.token
      }
    default:
      return state;
  }
}
