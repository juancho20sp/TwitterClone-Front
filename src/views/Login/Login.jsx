import React, { useState, useContext } from 'react';
import './Login.css';

// Routing
import routes from '../../utils/routing/routes';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useAccount } from '../../utils/aws/hooks';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useAccount();

  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log('Logged in!', data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    navigate(routes.signUp.path);
  };

  return (
    <div className='login-container'>
      <form onSubmit={onSubmit} className='login-form'>
        <h2>Bienvenido a Twitter</h2>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            value={email}
            id={`email`}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id={`password`}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>

        <div className='login-form__buttons'>
          <button onClick={handleSignUp}>Sign up</button>
          <button type='submit'>Login!</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
