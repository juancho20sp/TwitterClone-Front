import React, { useState } from 'react';
import './Login.css';

// Routing
import routes from '../../utils/routing/routes';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useAccount } from '../../utils/aws/hooks';

// Elements
import swal from 'sweetalert';

// Icons
import { BsTwitter } from 'react-icons/bs';

// Components
import { Loader } from '../../components';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate, isLoading } = useAccount();

  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {})
      .catch((err) => {
        console.error(err);

        if (Object.values(err).includes('UserNotConfirmedException')) {
          swal(
            '¡Debes confirmar tu cuenta!',
            'No puedes ingresar hasta que no confirmes tu cuenta',
            'error'
          );
        }
      });
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    navigate(routes.signUp.path);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className='login-container'>
      <div className='login-form_container'>
        <form onSubmit={onSubmit} className='login-form'>
          <BsTwitter />
          <h2>Inicia sesión en Twitter</h2>
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
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id={`password`}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder={'Contraseña'}
            />
          </div>

          <button type='submit'>Inicia Sesión</button>

          <p>
            ¿No tienes una cuenta? &nbsp;
            <span onClick={handleSignUp}>Regístrate</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
