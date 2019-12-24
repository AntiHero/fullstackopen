import React from 'react';

const LoginForm = ({
  handleLogin,
  username,
  password
}) => {


  return (
    <form onSubmit={handleLogin} className='loginForm'>
      <div>
        Username
        <input
          {...username}
        />
      </div>
      <div>
        Password
        <input
          {...password}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );
};

export default LoginForm;
