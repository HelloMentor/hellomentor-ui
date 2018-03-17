export function postChannel(channel, liu) {
  return fetch(process.env.REACT_APP_API_URL + '/chat/channels', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + liu.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ channel })
  });
}

export function getChannel(channelId) {
  return fetch(process.env.REACT_APP_API_URL + '/chat/channels/' + channelId, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}

export function getChannels(liu) {
  return fetch(process.env.REACT_APP_API_URL + '/chat/channels/?user_id=' + liu.id, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + liu.token,
      'Content-Type': 'application/json'
    }
  });
}

export function postMessage(message, liu) {
  return fetch(process.env.REACT_APP_API_URL + '/chat/channels/' + message.channel_id + '/messages' , {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + liu.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });
}

export function pair(userIdA, userIdB) {
  var a = parseInt(userIdA, 16);
  var b = parseInt(userIdB, 16);

  if (a < b) {
    return userIdA.toString() + '_' + userIdB.toString();
  } else {
    return userIdB.toString() + '_' + userIdA.toString();
  }
}

export function unpair(z) {
  return z.split('_');
}
