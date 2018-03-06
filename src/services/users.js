export function getAllUsers() {
  return fetch(process.env.REACT_APP_API_URL + '/users-list', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}

export function getLoggedInUser() {
  return fetch(process.env.REACT_APP_API_URL + '/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}

export function login(user) {
  return fetch(process.env.REACT_APP_API_URL + '/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user })
  });
}

export function updateUser(user) {
  return fetch(process.env.REACT_APP_API_URL + '/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
    body: JSON.stringify({ user })
  });
}
