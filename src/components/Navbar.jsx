import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, username, setUsername } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.className !== 'nav-action-btn' && !e.target.closest('.modal')) {
        setShowLogoutModal(false);
      }
    };
  
    document.addEventListener('click', handleOutsideClick);
  
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    console.log(`Username is now: ${username}`);
  }, [username]);

  return (
    <div className='navbar'>
      <div className='navbar-left'>GPT Fitness</div>
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
              onClick={() => setShowLogoutModal(true)}
            >
              {username || 'Unnamed User'}{' '}
              {/* Display 'Unnamed User' if username is empty */}
            </button>
            {showLogoutModal && (
              <div className='modal'>
                <button className='modal-action-btn' onClick={handleLogout}>
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