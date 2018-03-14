import * as services from '../../services/chat';
import * as types from './actionTypes'

export function getChatToken(user) {
  return dispatch => {
    return services.getChatToken(user)
      .then(res => res.json())
      .then(token => {
        dispatch({ type: types.SET_CHAT_TOKEN, token });
      })
  }
}
