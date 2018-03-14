export function getChatToken(user) {
  return fetch(process.env.REACT_APP_API_URL + '/chat/token', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + user.token
    },
  });
}
