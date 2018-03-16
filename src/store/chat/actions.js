import * as types from './actionTypes'
import * as services from '../../services/chat';

export function addMessage(message) {
  return dispatch => {
    dispatch({ type: types.ADD_MESSAGE, message });
  }
}

export function receiveMessage(message) {
  return dispatch => {
    dispatch({ type: types.MESSAGE_RECEIVED, message });
  }
}

export function createChannel(channel, liu) {
  return dispatch => {
    // send back promise so we can take user to next page after update
    return services.postChannel(channel, liu)
      .then(res => res.json())
      .then(result => {
        dispatch({ type: types.ADD_CHANNEL, channel: result });
        return result;
      });
  }
}
