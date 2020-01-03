const blogsReducer = (
  state = {
    all: [],
    blog: {
      title: '',
      author: '',
      url: '',
    },
  },
  action
) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return { ...state, all: action.data };
  case 'INIT_BLOG':
    return { ...state, blog: action.data };
  default:
    return state;
  }
};

export default blogsReducer;
