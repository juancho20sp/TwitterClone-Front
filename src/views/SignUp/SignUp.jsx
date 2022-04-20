import React, { useState } from 'react';
import './SignUp.css';

// Elements
import swal from 'sweetalert';

// Icons
import { BsTwitter } from 'react-icons/bs';

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

  const clearData = () => {
    setEmail('');
  };

  const onCancel = (event) => {
    event.preventDefault();

    clearData();
    navigate(routes.login.path);
  };

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
    <div className='signUp-container'>
      <div className='signUp-form_container'>
        <form onSubmit={onSubmit} className='signUp-form'>
          <BsTwitter />
          <h2>Únete a Twitter hoy mismo</h2>

          <div className='row'>
            <div>
              <label htmlFor='firstname'>Nombre</label>
              <input
                type='text'
                value={firstname}
                id={`firstname`}
                onChange={(ev) => setFirstname(ev.target.value)}
                placeholder={'Nombre'}
              />
            </div>

            <div>
              <label htmlFor='lastname'>Apellido</label>
              <input
                type='text'
                value={lastname}
                id={`lastname`}
                onChange={(ev) => setLastname(ev.target.value)}
                placeholder={'Apellido'}
              />
            </div>
          </div>

          <div className='row'>
            <div>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                value={username}
                id={`username`}
                onChange={(ev) => setUsername(ev.target.value)}
                placeholder={'Username'}
              />
            </div>

            <div>
              <label htmlFor='displayName'>Display name</label>
              <input
                type='text'
                value={displayName}
                id={`displayName`}
                onChange={(ev) => setDisplayName(ev.target.value)}
                placeholder={'Display name'}
              />
            </div>
          </div>

          <div className='row'>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                value={email}
                id={`email`}
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder={'Email'}
              />
            </div>

            <div>
              <label htmlFor='avatarUrl'>Avatar URL</label>
              <input
                type='text'
                value={avatarUrl}
                id={`avatarUrl`}
                onChange={(ev) => setAvatarUrl(ev.target.value)}
                placeholder={'URL del avatar'}
              />
            </div>
          </div>

          <div className='row'>
            <div>
              <label htmlFor='password'>Contraseña</label>
              <input
                type='password'
                id={`password`}
                onChange={(ev) => setPassword(ev.target.value)}
                placeholder={'Contraseña'}
              />
            </div>

            <div>
              <label htmlFor='confirm-password'>Confirmar Contraseña</label>
              <input
                type='password'
                id={`confirm-password`}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                placeholder={'Confirmar contraseña'}
              />
            </div>
          </div>

          {error && <p>Algo salió mal, por favor verifique las entradas</p>}

          <button type='submit'>Registrarse</button>

          <p className='signIn'>
            ¿Ya tienes una cuenta? &nbsp;
            <span onClick={onCancel}>Iniciar sesión</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
