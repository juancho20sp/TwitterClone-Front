import React, { useState } from 'react';

// Elements
import swal from 'sweetalert';

// AWS
import UserPool from '../../utils/aws/UserPool';

// Routing
import routes from '../../utils/routing/routes';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [verified, setVerified] = useState('0');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [error, setError] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(
      email,
      password,
      [
        {
          Name: 'name',
          Value: firstname,
        },
        {
          Name: 'family_name',
          Value: lastname,
        },
        {
          Name: 'custom:username',
          Value: username,
        },
        {
          Name: 'custom:displayName',
          Value: displayName,
        },
        {
          Name: 'custom:verified',
          Value: verified,
        },
        {
          Name: 'custom:avatar',
          Value: avatarUrl,
        },
      ],
      null,
      (err, data) => {
        if (err) {
          console.error(err);
          setError(err);
          swal(
            'Algo salió mal',
            'Inténtalo nuevamente o ponte en contacto con los administradores del sitio :c',
            'error'
          );
        }

        if (data) {
          swal(
            'Usuario registrado exitosamente',
            'Ya puedes ingresar al sistema con tu cuenta',
            'success'
          );

          navigate(routes.login.path);
        }
      }
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='firstname'>Firstname</label>
          <input
            type='text'
            value={firstname}
            id={`firstname`}
            onChange={(ev) => setFirstname(ev.target.value)}
          />
        </div>

        <div>
          <label htmlFor='lastname'>Lastname</label>
          <input
            type='text'
            value={lastname}
            id={`lastname`}
            onChange={(ev) => setLastname(ev.target.value)}
          />
        </div>

        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            value={username}
            id={`username`}
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </div>

        <div>
          <label htmlFor='displayName'>Display name</label>
          <input
            type='text'
            value={displayName}
            id={`displayName`}
            onChange={(ev) => setDisplayName(ev.target.value)}
          />
        </div>

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
          <label htmlFor='avatarUrl'>Avatar URL</label>
          <input
            type='text'
            value={avatarUrl}
            id={`avatarUrl`}
            onChange={(ev) => setAvatarUrl(ev.target.value)}
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

        <div>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            type='password'
            id={`confirm-password`}
            onChange={(ev) => setConfirmPassword(ev.target.value)}
          />
        </div>

        {error && <p>Algo salió mal, por favor verifique las entradas</p>}

        <button type='submit'>Sign Up!</button>
      </form>
    </div>
  );
};

export default SignUp;
