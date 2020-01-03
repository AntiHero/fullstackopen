const notificationReducer = (state = { text: '', show: false }, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return { ...state, text: action.data };
  case 'SHOW_NOTIFICATION':
    return { ...state, show: action.data };
  default:
    return state;
  }
};

export default notificationReducer;
