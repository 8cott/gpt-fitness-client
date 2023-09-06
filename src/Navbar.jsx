import React, { useState } from 'react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className='navbar'>
      <div className='navbar-left'>GPT Fitness</div>
      <div className='navbar-right'>
        {!isLoggedIn ? (
          <>
            <button
              className='nav-action-btn'
              onClick={() => setShowModal(!showModal)}
            >
              Signup/Login
            </button>
            {showModal && <AuthModal setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} closeModal={() => setShowModal(false)} />}
          </>
        ) : (
          <>
            <button className='nav-action-btn'>{username}</button>
            <button className='modal-action-btn' onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
