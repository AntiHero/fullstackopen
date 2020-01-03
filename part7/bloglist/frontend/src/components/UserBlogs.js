import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';

const UserBlogs = props => {
  const { user } = props;

  if (user === undefined) return <></>;

  return (
    <div>
      <h3>{user.name}</h3>
      <b>Added blogs</b>
      <List>
        {user.blogs.map(blog => (
          <List.Item key={blog.id + 'blog'}>{blog.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default connect()(UserBlogs);
