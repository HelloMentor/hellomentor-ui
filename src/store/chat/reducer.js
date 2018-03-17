import * as types from './actionTypes';

const initialState = {
  channels: [],
  messages: [],
  currentChannel: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SEND_MESSAGE:
      return {
        ...state,
        currentChannel: {
          ...state.currentChannel,
          messages: state.currentChannel.messages.concat(action.message)
        }
      }
    case types.RECEIVE_MESSAGE:
      return {
        ...state,
        currentChannel: {
          ...state.currentChannel,
          messages: state.currentChannel.messages.concat(action.message)
        }
      }
    case types.FETCH_CHANNELS:
      return {
        ...state,
        channels: action.channels
      }
    case types.ADD_CHANNEL:
      return {
        ...state,
        channels: state.channels.concat(action.channel)
      }
    case types.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.channel
      }
    default:
      return state;
  }
}
