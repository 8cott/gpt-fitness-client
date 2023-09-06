import React from 'react';
import axios from 'axios';
import validator from 'validator';

const SignupForm = ({ setIsLoggedIn, setUsername, setError, closeModal }) => {
    const validateSignup = (username, email, password) => {
        if (!username || username.length < 4) {
          return 'Username should be at least 4 characters long.';
        }
        if (!validator.isEmail(email)) {
          return 'Please provide a valid email address.';
        }
        if (!password || password.length < 8) {
          return 'Password should be at least 8 characters long.';
        }
        return null;
      };

      const resetError = () => {
        setError('');
      };
    
      const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
    
        const validationError = validateSignup(username, email, password);
        if (validationError) {
          setError(validationError); 
          return;
        }
    
        try {
          const response = await axios.post('/users', {
            email,
            username,
            password,
          });
          if (response.data.message) {
            console.log(response.data.message);
            setIsLoggedIn(true);
            closeModal();
            setUsername(username);
            resetError();
          }
        } catch (error) {
          setError(error.response.data.error.message);
        }
      };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSignupSubmit}>
        <input type='text' name='username' placeholder='Username' required />
        <input type='email' name='email' placeholder='Email' required />
        <input type='password' name='password' placeholder='Password' required />
        <button type='submit'>Signup</button>
      </form>
    </>
  );
};

export default SignupForm;
