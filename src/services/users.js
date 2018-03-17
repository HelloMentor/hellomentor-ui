export function getAllUsers() {
  return fetch(process.env.REACT_APP_API_URL + '/users-list', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}

export function getFullyAuthedUser(userId, token) {
  return fetch(process.env.REACT_APP_API_URL + '/users/auth/' + userId, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

export function login(user) {
  return fetch(process.env.REACT_APP_API_URL + '/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user })
  });
}

export function updateUser(user, profileImage) {
  var formData  = new FormData();
  formData.append('user', JSON.stringify(user));
  formData.append('profile_image', profileImage);

  return fetch(process.env.REACT_APP_API_URL + '/users', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + user.token
    },
    body: formData
  });
}
