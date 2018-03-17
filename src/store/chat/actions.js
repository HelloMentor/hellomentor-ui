import * as types from './actionTypes'
import * as services from '../../services/chat';

export function sendMessage(message, liu) {
  return dispatch => {
    return services.postMessage(message, liu)
      .then(res => res.json())
      .then(result => {
        dispatch({ type: types.SEND_MESSAGE, message });
        return result;
      });
  }
}

export function receiveMessage(message) {
  return dispatch => {
    dispatch({ type: types.RECEIVE_MESSAGE, message });
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

export function setCurrentChannel(channelId) {
  return dispatch => {
    return services.getChannel(channelId)
      .then(res => res.json())
      .then(channel => {
        dispatch({ type: types.SET_CURRENT_CHANNEL, channel: channel.channel });
        return channel.channel;
      });
  }
}
