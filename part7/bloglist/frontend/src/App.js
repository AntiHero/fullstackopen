import React, { useEffect } from 'react';
import blogService from './services/blogs';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginFrom from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Toggable from './components/Toggable';
import Users from './components/Users';
import { connect } from 'react-redux';
import { initBlogs, initBlog, createBlog } from './actionCreators/blogsActions';
import UserBlogs from './components/UserBlogs';
import {
  getUsers,
  loginUser,
  logoutUser,
  resetCreds,
  setLoginStatus,
  setUser,
} from './actionCreators/userActions';
import { setMessage, showMessage } from './actionCreators/notificationActions';
import './App.css';
import { Router, Route, Redirect, Link } from 'react-router-dom';
import SingleBlog from './components/SingleBlog';
import history from './history/history';
import {
  Container,
  Table,
  Menu,
  Button,
  Dimmer,
  Loader,
  Grid,
} from 'semantic-ui-react';

let timer = 0;

const App = props => {
  const {
    blogs,
    createBlog,
    initBlogs,
    initBlog,
    getUsers,
    loginUser,
    logoutUser,
    notification,
    resetCreds,
    setLoginStatus,
    setMessage,
    setUser,
    showMessage,
    user,
  } = props;

  const toggleRef = React.createRef();

  useEffect(() => {
    if (user.logged) {
      initBlogs();
      getUsers();
    }
    // eslint-disable-next-line
  }, [user.logged]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setLoginStatus(true);
      blogService.setToken(user.token);
    } else {
      setLoginStatus(false);
    }
    // eslint-disable-next-line
  }, []);

  const userById = id => user.all.find(user => user.id === id);
  const blogById = id => blogs.all.find(blog => blog.id === id);

  const padding = { padding: '5px' };

  const handleLogin = async e => {
    e.preventDefault();
    clearTimeout(timer);
    try {
      let response = await loginUser(user.creds);
      resetCreds();

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(response)
      );

      blogService.setToken(response.token);

      history.push('/');

      setMessage(`Welcome, ${response.name} !`);
      showMessage(true);
      timer = setTimeout(() => {
        setMessage(null);
        showMessage(false);
      }, 3000);
    } catch (exception) {
      console.log(exception);
      setMessage('Wrong credentials');
      showMessage(true);
      timer = setTimeout(() => {
        setMessage(null);
        showMessage(false);
      }, 3000);
    }
  };

  const handleLogout = () => {
    clearTimeout(timer);
    window.localStorage.clear();

    logoutUser();
    initBlogs({
      title: '',
      author: '',
      url: '',
    });
    showMessage(false);
  };

  const handleCreateBlog = async e => {
    clearTimeout(timer);
    e.preventDefault();
    toggleRef.current.toggleVisibility();

    await createBlog(blogs.blog);
    await initBlogs();
    await getUsers();

    setMessage(`New blog ${blogs.blog.title} added`);

    showMessage(true);
    initBlog({
      title: '',
      author: '',
      url: '',
    });
    timer = setTimeout(() => {
      setMessage(null);
      showMessage(false);
    }, 3000);
  };

  return (
    <Router history={history}>
      <Container>
        <div className='App'>
          <Grid columns={1} centered style={{ maxWidth: 500, margin: '0 auto' }}>
            <Grid.Row>
              <Grid.Column>
                <div>
                  {notification.show === true && <Notification />}
                  {user.logged === null ? (
                    <Dimmer active inverted>
                      <Loader>Loading</Loader>
                    </Dimmer>
                  ) : !user.logged ? (
                    <Redirect to='/login' />
                  ) : (
                    <>
                      <Menu inverted>
                        <Menu.Item link>
                          <Link style={padding} to='/'>
                            BLOGS
                          </Link>
                        </Menu.Item>
                        <Menu.Item link>
                          <Link style={padding} to='/users'>
                            USERS
                          </Link>
                        </Menu.Item>
                        <div className='right menu'>
                          <Menu.Item>
                            <b>{user.info.name}</b>
                            <Button
                              onClick={handleLogout}
                              style={{ marginLeft: 10 }}
                              color='red'
                            >
                              Log out
                            </Button>
                          </Menu.Item>
                        </div>
                      </Menu>
                    </>
                  )}
                  <Route exact path='/'>
                    <h3>BLOGS</h3>
                    <Toggable buttonLabel='New' ref={toggleRef}>
                      <CreateBlogForm handleCreateBlog={handleCreateBlog} />
                    </Toggable>
                    <br />
                    <Table striped celled inverted>
                      <Table.Body>
                        {blogs.all.map(blog => {
                          return (
                            <Table.Row key={blog.id}>
                              <Table.Cell>
                                <Blog blog={blog} />
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </Route>
                  <Route path='/login'>
                    <div className='loginform'>
                      <h3>Log in to application</h3>
                      <LoginFrom handleLogin={handleLogin} />
                    </div>
                  </Route>
                  <Route exact path='/users' render={() => <Users />} />
                  <Route
                    path='/users/:id'
                    render={({ match }) => (
                      <UserBlogs user={userById(match.params.id)} />
                    )}
                  />
                  <Route
                    path='/blogs/:id'
                    render={({ match }) => (
                      <SingleBlog blog={blogById(match.params.id)} />
                    )}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  createBlog,
  initBlogs,
  initBlog,
  getUsers,
  loginUser,
  logoutUser,
  resetCreds,
  setLoginStatus,
  setMessage,
  setUser,
  showMessage,
})(App);
