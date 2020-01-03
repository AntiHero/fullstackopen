import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initBlog } from '../actionCreators/blogsActions';
import { Button, Input, Label, Segment } from 'semantic-ui-react';

const CreateBlogForm = props => {
  const { handleCreateBlog, initBlog, blog } = props;

  return (
    <form onSubmit={handleCreateBlog}>
      <h3>Create blog</h3>
      <div>
        <Segment style={{ marginBottom: 10 }}>
          <Label attached='top' color='red'>
            Title
          </Label>
          <Input
            type='text'
            required
            placeholder='...'
            value={blog.title}
            name='title'
            onChange={({ target }) =>
              initBlog({ ...blog, title: target.value })
            }
            style={{ width: '100%' }}
          />
        </Segment>
      </div>
      <div>
        <Segment style={{ marginBottom: 10 }}>
          <Label attached='top' color='orange'>
            Author
          </Label>
          <Input
            type='text'
            required
            value={blog.author}
            placeholder='...'
            name='author'
            onChange={({ target }) =>
              initBlog({ ...blog, author: target.value })
            }
            style={{ width: '100%' }}
          />
        </Segment>
      </div>
      <div>
        <Segment style={{ marginBottom: 10 }}>
          <Label attached='top' color='yellow'>
            Url
          </Label>
          <Input
            placeholder='https://...'
            required
            type='text'
            value={blog.url}
            name='url'
            onChange={({ target }) => initBlog({ ...blog, url: target.value })}
            style={{ width: '100%' }}
          />
        </Segment>
      </div>
      <Button color='pink' type='submit'>
        Create
      </Button>
    </form>
  );
};

CreateBlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
  initBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    blog: state.blogs.blog,
  };
};

export default connect(mapStateToProps, { initBlog })(CreateBlogForm);
