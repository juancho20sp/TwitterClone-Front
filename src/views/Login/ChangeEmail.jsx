import React, { useState, useContext } from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { AccountContext } from './Account';

const ChangeEmail = () => {
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const { getSession, authenticate } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    getSession().then(({ user, email }) => {
      authenticate(email, password).then(() => {
        const attributes = [
          new CognitoUserAttribute({ Name: 'email', Value: newEmail }),
        ];

        user.updateAttributes(attributes, (err, results) => {
          if (err) {
            console.error(err);
          } else {
            console.log(results);
          }
        });
      });
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='email'>Old email</label>
          <input
            type='text'
            value={email}
            id={`email`}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>

        <div>
          <label htmlFor='new-email'>New email</label>
          <input
            type='text'
            value={newEmail}
            id={`new-email`}
            onChange={(ev) => setNewEmail(ev.target.value)}
          />
        </div>

        <button type='submit'>Change email!</button>
      </form>
    </div>
  );
};

export default ChangeEmail;
