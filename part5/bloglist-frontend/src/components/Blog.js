import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, user, setBlogs }) => {
  const [expandInfo, setExpandInfo] = useState(false);

  const handleExpandInfo = e => {
    if (e.target.tagName !== 'BUTTON') setExpandInfo(!expandInfo);
  };

  const handleLike = async () => {
    await blogService.update(
      {
        ...blog,
        likes: ++blog.likes,
      },
      blog.id
    );

    setBlogs(await blogService.getAll());
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Do you really want to delete '${blog.title}' by ${blog.author}?`
      )
    ) {
      await blogService.deleteBlog(blog.id);

      setBlogs(await blogService.getAll());
    }
  };

  return expandInfo ? (
    <div className='expandedBlog' onClick={handleExpandInfo}>
      {blog.title} {blog.author}
      <br />
      {blog.url}
      <br />
      {blog.likes} likes
      <button onClick={handleLike}>like</button>
      <br />
      {blog.user ? 'added by' + blog.user.name : null}
      <br />
      {blog.user && blog.user.name === user.name ? (
        <button onClick={handleDelete}>delete</button>
      ) : null}
    </div>
  ) : (
    <div className='blog' onClick={handleExpandInfo}>
      {blog.title} {blog.author}
    </div>
  );
};

export default Blog;
