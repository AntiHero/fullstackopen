import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../mutations/login';

const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [
    login,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN);

  const submit = async event => {
    event.preventDefault();

    const result = await login({
      variables: { username, password },
    });

    if (result) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem('library-user-token', token);
    }
  };

  return (
    <div>
      <h3>Login to use library</h3>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>{mutationError.message} :( Please try again</p>}
    </div>
  );
};

export default LoginForm;
