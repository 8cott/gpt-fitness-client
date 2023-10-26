import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    userId,
    setUserId,
  } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserId(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('user_id');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setUserId(storedUserId);
    } else {
      setIsLoggedIn(false);
      setUsername('');
      setUserId(null);
    }

    return () => {
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        e.target.className !== 'nav-action-btn' &&
        !e.target.closest('.modal')
      ) {
        setShowLogoutModal(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className='navbar'>
      <div className='navbar-left'><Link to="/" className='gpt-fitness'>GPT Fitness</Link></div>
      <div className='navbar-right'>
        {!isLoggedIn ? (
          <>
            <button
              className='nav-action-btn'
              onClick={() => setShowAuthModal(!showAuthModal)}
            >
              Signup/Login
            </button>
            {showAuthModal && (
              <AuthModal
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
                closeModal={() => setShowAuthModal(false)}
              />
            )}
          </>
        ) : (
          <>
            <button
              className='nav-action-btn'
              onClick={() => setShowLogoutModal(prevState => !prevState)}
            >
              {username || 'Unnamed User'}{' '}
            </button>
            {showLogoutModal && (
              <div className='modal'>
                <button className='modal-btn'><Link to="/saved-fitness-plans">
                  Saved Fitness Plans</Link>
                </button>
                <button className='modal-btn'><Link to="/saved-diet-plans">
                  Saved Diet Plans</Link>
                </button>
                <button className='modal-btn' onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
