import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuth } from './AuthContext';

const AuthModal = ({ closeModal }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { setIsLoggedIn, setUsername, setUserId } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        e.target.className !== 'nav-action-btn' &&
        !e.target.closest('.modal')
      ) {
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
          <LoginForm
            setIsLoggedIn={setIsLoggedIn}
            setUsername={setUsername}
            setUserId={setUserId}
            setError={setError}
            closeModal={closeModal}
          />
          <button className='modal-btn' onClick={() => setIsLoginMode(false)}>
            Switch to Signup
          </button>
        </>
      ) : (
        <>
          <SignupForm
            setIsLoggedIn={setIsLoggedIn}
            setUsername={setUsername}
            setUserId={setUserId}
            setError={setError}
            closeModal={closeModal}
          />
          <button className='modal-btn' onClick={() => setIsLoginMode(true)}>
            Switch to Login
          </button>
        </>
      )}
    </div>
  );
};

export default AuthModal;
