import React from 'react';
import axiosInstance from './AxiosConfig';
import validator from 'validator';
import { useAuth } from './AuthContext';

const SignupForm = ({ setError, closeModal }) => {
  const { setIsLoggedIn, setUsername, setUserId } = useAuth();

  const validateSignup = (username, email, password, confirmPassword) => {
    if (!username || username.length < 4) {
      return 'Username should be at least 4 characters long.';
    }
    if (!validator.isEmail(email)) {
      return 'Please provide a valid email address.';
    }
    if (!password || password.length < 8) {
      return 'Password should be at least 8 characters long.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return null;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const validationError = validateSignup(
      username,
      email,
      password,
      confirmPassword
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axiosInstance.post('/users', {
        email,
        username,
        password,
      });
      if (response.data.access_token) {
        const { access_token, user_id, username } = response.data;
        setIsLoggedIn(true);
        closeModal();
        setUsername(username);
        setUserId(user_id);
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('username', username);
        localStorage.setItem('user_id', user_id);

        // console.log(`User logged in as: ${username}`);
        // console.log(`Token: ${access_token}`);
      }
    } catch (error) {
      setError(
        error.response?.data?.error?.message || 'An unexpected error occurred.'
      );
    }
  };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSignupSubmit}>
        <input type='text' name='username' placeholder='Username' required />
        <input type='email' name='email' placeholder='Email' required />
        <input
          type='password'
          name='password'
          placeholder='Password'
          required
        />
        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          required
        />
        <div className='btn-container'>
        <button type='submit' className='modal-btn'>
          Signup
        </button>
        </div>
        </form>
    </>
  );
};

export default SignupForm;
