export const setMessage = message => {
  return {
    type: 'SET_NOTIFICATION',
    data: message,
  };
};

export const showMessage = status => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: status,
  };
};
