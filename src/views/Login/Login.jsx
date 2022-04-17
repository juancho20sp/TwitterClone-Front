import React, { useState, useContext } from 'react';

import { AccountContext } from './Account';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useContext(AccountContext);

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

  return (
    <div>
      <form onSubmit={onSubmit}>
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

        <button type='submit'>Login!</button>
      </form>
    </div>
  );
};

export default Login;
