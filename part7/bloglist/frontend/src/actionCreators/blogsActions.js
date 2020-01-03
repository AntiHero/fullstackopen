import blogServices from '../services/blogs';

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll();

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const initBlog = (blog) => {

  return {
    type: 'INIT_BLOG',
    data: blog,
  };
};

export const createBlog = blog => {
  return async dispatch => {
    const response = await blogServices.create(blog);

    dispatch({
      type: 'CREATE_BLOG',
      data: response.data,
    });
  };
};
