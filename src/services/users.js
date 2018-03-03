export function getAllUsers() {
  return fetch(process.env.REACT_APP_API_URL + '/users-list', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}

export function getLoggedInUser() {
  return fetch(process.env.REACT_APP_API_URL + '/user', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}
