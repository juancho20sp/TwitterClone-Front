import React, { useState } from 'react';

// Elements
import swal from 'sweetalert';

// Hooks
import { useAccount } from '../../utils/aws/hooks';

// Redux
import { useSelector } from 'react-redux';

const Profile = () => {
  const userAttributes = useSelector((state) => state.login.userData);
  const {
    'custom:avatar': avatarUrl,
    'custom:displayName': displayName,
    'custom:username': username,
    email,
    email_verified,
    name: firstname,
    family_name: lastname,
  } = userAttributes;

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
          <label htmlFor='firstname'>Nombres</label>
          <input type='text' value={firstname} id={`firstname`} disabled />
        </div>

        <div>
          <label htmlFor='lastname'>Apellidos</label>
          <input type='text' value={lastname} id={`lastname`} disabled />
        </div>

        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' value={username} id={`username`} disabled />
        </div>

        <div>
          <label htmlFor='displayName'>Display name</label>
          <input type='text' value={displayName} id={`displayName`} disabled />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input type='text' value={email} id={`email`} disabled />
        </div>

        <div>
          <label htmlFor='emailConfirmed'>¿Email confirmado?</label>
          <input
            type='checkbox'
            name='emailConfirmed'
            id='emailConfirmed'
            disabled
            value={email_verified === 'true' ? true : false}
          />
        </div>

        <div>
          <label htmlFor='avatarUrl'>Avatar URL</label>
          <input type='text' value={avatarUrl} id={`avatarUrl`} disabled />
        </div>

        <div>
          <img src={avatarUrl} alt='avatar' />
        </div>

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

        <button type='submit'>Cambiar contraseña</button>
      </form>
    </div>
  );
};

export default Profile;
