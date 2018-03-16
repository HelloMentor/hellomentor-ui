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
