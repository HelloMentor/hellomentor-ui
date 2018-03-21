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
  try {
    validateUser(user, 'login');
  } catch(err) {
    return Promise.reject(err.message);
  }

  return fetch(process.env.REACT_APP_API_URL + '/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user })
  });
}

export function signup(user, profileImage) {
  try {
    validateUser(user, 'signup');
  } catch(err) {
    return Promise.reject(err.message);
  }

  var formData  = new FormData();
  formData.append('user', JSON.stringify(user));
  formData.append('profile_image', profileImage);

  return fetch(process.env.REACT_APP_API_URL + '/users', {
    method: 'POST',
    body: formData
  });
}

export function updateUser(user, profileImage) {
  try {
    validateUser(user, 'update');
  } catch(err) {
    return Promise.reject(err.message);
  }

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

function validateUser(user, type) {
  let requiredFields = [];

  if (type === 'signup') {
    requiredFields = ['email', 'password', 'f_name', 'l_name', 'headline', 'summary'];
  } else if (type === 'update') {
    requiredFields = ['email', 'f_name', 'l_name', 'headline', 'summary'];
  } else if (type === 'login') {
    requiredFields = ['email', 'password'];
  }

  for (const field of requiredFields) {
    if (!user[field]) {
      let alertFieldText;

      if (field === 'f_name') {
        alertFieldText = 'your first name';
      } else if (field === 'l_name') {
        alertFieldText = 'your last name';
      } else if (field === 'email') {
        alertFieldText = 'your email address';
      } else if (field === 'password') {
        alertFieldText = 'a 7 character or longer password';
      } else if (field === 'headline') {
        alertFieldText = 'a headline';
      } else if (field === 'summary') {
        alertFieldText = 'a summary';
      }

      throw new Error('Please enter ' + alertFieldText + '.');
    }
  }
}
