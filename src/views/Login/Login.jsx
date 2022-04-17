import React, { useState, useEffect } from 'react';
import './Login.css';

// Components
// import { Loader } from '../../components';

// Hooks
import { useLogin } from './hooks';

const Login = () => {
  const {
    isLoading,
    setIsLoading,
    setEmail,
    setPassword,
    handleSignInClick,
    handleLogInClick,
  } = useLogin();

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, [setIsLoading]);

  //   const isLoading = false;

  return (
    <main className={'login-main'}>
      {isLoading ? (
        // <Loader />
        <p>Cargando</p>
      ) : (
        <div className={'login-container'}>
          <h1 className={'login-title'}>Saoko</h1>

          <form className={'login-form'}>
            <div className={'login-formRow'}>
              <label htmlFor='loginEmailInput'>Email</label>
              <input
                type='text'
                id='loginEmailInput'
                placeholder='mail@mail.com'
                className={'login-input'}
                onChange={(e) => setEmail(e.target.value.trim())}
              />
            </div>

            <div className={'login-formRow'}>
              <label htmlFor='loginPasswordInput'>Password</label>
              <input
                type='password'
                id='loginPasswordInput'
                placeholder='PASSWORD'
                className={'login-input'}
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </div>

            <div className={'login-formRow_actions'}>
              <button
                className={'login-button'}
                onClick={(e) => handleSignInClick(e)}
              >
                Sign in
              </button>
              <button
                className={'login-button'}
                onClick={(e) => handleLogInClick(e)}
              >
                Log in
              </button>
            </div>
          </form>

          <div className={'login-links'}>
            <a className={'login-link'}>Forgot your password?</a>
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;
