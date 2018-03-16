import * as types from './actionTypes';

const initialState = {
  channels: [],
  messages: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.message)
      }
    case types.MESSAGE_RECEIVED:
      return {
        ...state,
        messages: state.messages.concat(action.message)
      }
    case types.ADD_CHANNEL:
      return {
        ...state,
        channels: state.channels.concat(action.channel)
      }
    default:
      return state;
  }
}
