import React from 'react';
import PropTypes from 'prop-types';

const CreateBlogForm = ({ handleCreateBlog, setBlog, blog }) => (
  <form onSubmit={handleCreateBlog}>
    <h3>create new</h3>
    <div>
      title:
      <input
        type='text'
        value={blog.title}
        name='Title'
        onChange={({ target }) => setBlog({ ...blog, title: target.value })}
      />
    </div>
    <div>
      author:
      <input
        type='text'
        value={blog.author}
        name='Author'
        onChange={({ target }) => setBlog({ ...blog, author: target.value })}
      />
    </div>
    <div>
      url:
      <input
        type='text'
        value={blog.url}
        name='Url'
        onChange={({ target }) => setBlog({ ...blog, url: target.value })}
      />
    </div>
    <button type='submit'>create</button>
  </form>
);

CreateBlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
  setBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

export default CreateBlogForm;
