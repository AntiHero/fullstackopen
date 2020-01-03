import React, { useState } from 'react';
import blogService from '../services/blogs';
import { connect } from 'react-redux';
import { initBlogs } from '../actionCreators/blogsActions';
import { getUsers } from '../actionCreators/userActions';
import history from '../history/history';
import { Button, Icon, Label, Input, List } from 'semantic-ui-react';

const SingleBlog = props => {
  const { blog, user, initBlogs, getUsers } = props;
  const [comment, setComment] = useState('');

  const handleLike = async () => {
    await blogService.update(
      {
        likes: blog.likes + 1,
      },
      blog.id
    );

    initBlogs();
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Do you really want to delete '${blog.title}' by ${blog.author}?`
      )
    ) {
      await blogService.deleteBlog(blog.id);
      await initBlogs();
      await getUsers();

      history.push('/');
    }
  };

  const handleComment = val => {
    setComment(val);
  };

  const handleSendComment = async () => {
    if (!comment) window.alert('Empty comment! Please write something :)');
    else {
      await blogService.update({ comments: comment }, blog.id);
      initBlogs();
      setComment('');
    }
  };

  if (blog === undefined) return <></>;

  return (
    <div className='singleBlog'>
      <h3>
        {blog.title} <span>by</span> {blog.author}
      </h3>
      <a
        href={blog.url}
        style={{ display: 'block', marginBottom: 20, color: 'violet' }}
      >
        Watch here
      </a>
      <div>
        <Button as='div' labelPosition='left'>
          <Label as='a' basic pointing='right'>
            {blog.likes}
          </Label>
          <Button icon color='green' onClick={handleLike}>
            <Icon name='heart' />
            Like
          </Button>
        </Button>
      </div>
      {blog.user ? (
        <div>
          <br />
          added by <b>{blog.user.name}</b>
        </div>
      ) : null}
      <br />
      {blog.user && blog.user.name === user.name ? (
        <Button color='pink' onClick={handleDelete}>
          Delete
        </Button>
      ) : null}
      <h3>Comments</h3>
      <List>
        {blog.comments.map((comment, index) => (
          <List.Item as='li' value='*' key={index + 'comment'}>{comment}</List.Item>
        ))}
      </List>
      <Input
        type='text'
        value={comment}
        name='comment'
        onChange={({ target }) => handleComment(target.value)}
        placeholder='your comment...'
      />
      <Button color='blue' inverted style={{ marginLeft: 10 }} onClick={handleSendComment}>
        Add
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.info,
  };
};

export default connect(mapStateToProps, { initBlogs, getUsers })(SingleBlog);
