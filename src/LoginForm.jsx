import React from 'react';
import axios from 'axios';

const LoginForm = ({ setIsLoggedIn, setUsername, setError, closeModal }) => {
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('/login', { email, password });
      if (response.data && response.data.access_token) {
        setIsLoggedIn(true);
        setUsername(response.data.username);
        closeModal();
      }
    } catch (error) {
      setError('Login failed. Please check your email and password.');
      console.error(error);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input type='text' name='email' placeholder='email' required />
        <input type='password' name='password' placeholder='Password' required />
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default LoginForm;
