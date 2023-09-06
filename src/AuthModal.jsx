import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthModal = ({ setIsLoggedIn, setUsername, closeModal }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.className !== 'nav-action-btn' && !e.target.closest('.modal')) {
        closeModal();
      }
    };
  
    document.addEventListener('click', handleOutsideClick);
  
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [closeModal]);

  return (
    <div className='modal'>
      {error && <div className='error-message'>{error}</div>}
      {isLoginMode ? (
        <>
          <LoginForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setError={setError} closeModal={closeModal} />
          <button
            className='switch-btn'
            onClick={() => setIsLoginMode(false)}
          >
            Switch to Signup
          </button>
        </>
      ) : (
        <>
          <SignupForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setError={setError} closeModal={closeModal} />
          <button
            className='switch-btn'
            onClick={() => setIsLoginMode(true)}
          >
            Switch to Login
          </button>
        </>
      )}
    </div>
  );
};

export default AuthModal;
