import React, { useState } from 'react';

import UserPool from '../../utils/aws/UserPool';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      }

      console.log(data);
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

        <button type='submit'>Sign Up!</button>
      </form>
    </div>
  );
};

export default SignUp;
