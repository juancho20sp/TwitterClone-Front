import React, { useState } from 'react';

// Elements
import swal from 'sweetalert';

// Hooks
import { useAccount } from '../../utils/aws/hooks';

const Profile = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { getSession } = useAccount();

  const onSubmit = (event) => {
    event.preventDefault();

    getSession().then(({ user }) => {
      user.changePassword(password, newPassword, (err, result) => {
        if (err) {
          console.error(err);
          swal(
            'Algo salió mal',
            'Inténtalo nuevamente o ponte en contacto con los administradores del sitio :c',
            'error'
          );
        } else {
          console.log(result);
          swal(
            'Cambio de contraseña exitoso',
            'Desde ahora deberás utilizar tu nueva contraseña',
            'success'
          );
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

export default Profile;
