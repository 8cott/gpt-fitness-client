import React from 'react';
import axiosInstance from './AxiosConfig';
import { useAuth } from './AuthContext';

const LoginForm = ({ setError, closeModal }) => {
  const { setIsLoggedIn, setUsername, setUserId } = useAuth();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axiosInstance.post('/login', { email, password });

      if (response.data && response.data.access_token) {
        setIsLoggedIn(true);
        setUsername(response.data.username);
        setUserId(response.data.user_id);

        localStorage.setItem('username', response.data.username);
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('access_token', response.data.access_token);

        console.log(`User logged in as: ${response.data.username}`);
        console.log(`Token: ${response.data.access_token}`);

        closeModal();
      }
    } catch (error) {
      setError('Login failed. Please check your email and password.');
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input type='text' name='email' placeholder='email' required />
        <input
          type='password'
          name='password'
          placeholder='Password'
          required
        />
        <button type='submit' className='modal-btn'>Login</button>
      </form>
    </>
  );
};

export default LoginForm;
