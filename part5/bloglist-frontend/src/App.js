import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginFrom from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Toggable from './components/Toggable';
import { useField } from './hooks/index';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const toggleRef = React.createRef();
  const inputUsername = useField('text');
  const inputPassword = useField('password');

  // eslint-disable-next-line no-unused-vars
  const noClear = ({ clear, ...rest }) => rest;

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username: inputUsername.value,
        password: inputPassword.value,
      });

      /* setBlogs(blogs.filter(blog => blog.user && blog.user.username === user.username)); */

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);

      setMessage(`Welcome, ${user.name} !`);
      setShow(true);
      setTimeout(() => {
        setMessage(null);
        setShow(false);
      }, 3000);

      inputUsername.clear();
      inputPassword.clear();
    } catch (exception) {
      setMessage('Wrong credentials');
      setShow(true);
      setTimeout(() => {
        setMessage(null);
        setShow(false);
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setBlog({
      title: '',
      author: '',
      url: '',
    });
    setShow(false);
  };

  const handleCreateBlog = async e => {
    e.preventDefault();
    toggleRef.current.toggleVisibility();
    await blogService.create(blog);
    setBlogs(await blogService.getAll());
    setMessage(`New blog ${blog.title} add`);

    setShow(true);
    setBlog({
      title: '',
      author: '',
      url: '',
    });

    setTimeout(() => {
      setMessage(null);
      setShow(false);
    }, 3000);
  };

  return (
    <div className='App'>
      {show === true && <Notification message={message} />}

      {user === null ? (
        <>
          <h3>log in to application</h3>
          <LoginFrom
            handleLogin={handleLogin}
            username={noClear(inputUsername)}
            password={noClear(inputPassword)}
          />
        </>
      ) : (
        <>
          <h3>blogs</h3>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Toggable buttonLabel='new blog' ref={toggleRef}>
            <CreateBlogForm
              handleCreateBlog={handleCreateBlog}
              setBlog={setBlog}
              blog={blog}
            />
          </Toggable>
          <br />
          {blogs.map(blog => {
            return (
              <Blog blog={blog} key={blog.id} setBlogs={setBlogs} user={user} />
            );
          })}
        </>
      )}
    </div>
  );
};

export default App;
