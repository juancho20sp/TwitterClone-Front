import React, { useState, useContext } from 'react';
import { AccountContext } from './Account';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { getSession } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    getSession().then(({ user }) => {
      user.changePassword(password, newPassword, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log(result);
        }
      });
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='password'>Old password</label>
          <input
            type='password'
            value={password}
            id={`password`}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>

        <div>
          <label htmlFor='new-password'>New password</label>
          <input
            type='password'
            value={newPassword}
            id={`new-password`}
            onChange={(ev) => setNewPassword(ev.target.value)}
          />
        </div>

        <button type='submit'>Login!</button>
      </form>
    </div>
  );
};

export default ChangePassword;
