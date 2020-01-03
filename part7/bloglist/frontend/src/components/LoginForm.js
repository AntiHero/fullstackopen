import React from 'react';
import { connect } from 'react-redux';
import { setCreds } from '../actionCreators/userActions';
import { Input, Button } from 'semantic-ui-react';

const LoginForm = props => {
  const { creds, handleLogin, setCreds } = props;

  return (
    <form onSubmit={handleLogin} className='loginForm'>
      <div>
        <Input
          name='username'
          label='Username'
          type='text'
          value={creds.username}
          onChange={event =>
            setCreds({ ...creds, username: event.target.value })
          }
          required
          style={{ width: '60%', marginBottom: 10 }}
        />
      </div>
      <div>
        <Input
          name='password'
          label='Password'
          type='password'
          value={creds.password}
          onChange={event =>
            setCreds({ ...creds, password: event.target.value })
          }
          required
          style={{ width: '60%', marginBottom: 10 }}
        />
      </div>
      <Button color='yellow' type='submit'>Login</Button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    creds: state.user.creds,
  };
};

export default connect(mapStateToProps, { setCreds })(LoginForm);
