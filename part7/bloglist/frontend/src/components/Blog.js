import React from 'react';
import { Link } from 'react-router-dom';

const Blog = props => {
  const { blog } = props;

  return (
    <div className='blog' style={{ padding: '5px' }}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} <span>by</span> {blog.author}
      </Link>
    </div>
  );
};


export default Blog;
