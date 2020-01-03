const userReducer = (
  state = {
    logged: null,
    creds: { username: '', password: '' },
    info: { name: '', username: '', token: '' },
    all: []
  },
  action
) => {
  switch (action.type) {
  case 'SET_USER': {
    return { ...state, info: action.data };
  }
  case 'SET_CREDS': {
    return { ...state, creds: action.data };
  }
  case 'RESET_CREDS': {
    return { ...state, creds: { username: '', password: '' } }
  }
  case 'LOGIN_USER': {
    return { ...state, logged: action.data };
  }
  case 'LOGOUT_USER': {
    return {
      ...state,
      info: { name: '', username: '', token: '' },
      logged: action.data,
    };
  }
  case 'SET_LOGIN_STATUS': {
    return {
      ...state,
      logged: action.data
    }
  }
  case 'GET_USERS': {
    return {
      ...state,
      all: action.data
    }
  }
  default:
    return state;
  }
};

export default userReducer;
