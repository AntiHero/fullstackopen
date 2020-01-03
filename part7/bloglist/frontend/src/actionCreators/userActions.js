import loginService from '../services/login';
import userService from '../services/users';

export const setUser = user => {
  return {
    type: 'SET_USER',
    data: user,
  };
};

export const setCreds = creds => {
  return {
    type: 'SET_CREDS',
    data: creds,
  };
};

export const resetCreds = () => {
  return {
    type: 'RESET_CREDS',
    data: null
  }
}

export const setLoginStatus = status => {
  return {
    type: 'SET_LOGIN_STATUS',
    data: status
  }
}

export const loginUser = creds => {
  return async dispatch => {
    const response = await loginService.login(creds);

    dispatch({
      type: 'SET_USER',
      data: response,
    });

    dispatch({
      type: 'LOGIN_USER',
      data: true,
    });
    return response;
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
    data: false,
  };
};

export const getUsers = () => {
  return async dispatch => {
    const response = await userService.getAll();

    dispatch({
      type: 'GET_USERS',
      data: response
    })
  }
}
