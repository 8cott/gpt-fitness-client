// // Navbar.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import validator from 'validator';

// const API_BASE_URL = 'http://127.0.0.1:5000';
// axios.defaults.baseURL = API_BASE_URL;

// const EntireNavCode = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [isLoginMode, setIsLoginMode] = useState(true);
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const [error, setError] = useState(''); // Add an error state

//   const resetError = () => {
//     setError('');
//   };

//   const validateSignup = (username, email, password) => {
//     if (!username || username.length < 4) {
//       return 'Username should be at least 4 characters long.';
//     }
//     if (!validator.isEmail(email)) {
//       return 'Please provide a valid email address.';
//     }
//     if (!password || password.length < 8) {
//       return 'Password should be at least 8 characters long.';
//     }
//     return null;
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const username = e.target.username.value;
//     const password = e.target.password.value;

//     const validationError = validateSignup(username, email, password);
//     if (validationError) {
//       setError(validationError); 
//       return;
//     }

//     try {
//       const response = await axios.post('/users', {
//         email,
//         username,
//         password,
//       });
//       if (response.data.message) {
//         console.log(response.data.message);
//         setIsLoggedIn(true);
//         setShowModal(false);
//         setUsername(username);
//         resetError();
//       }
//     } catch (error) {
//       setError(error.response.data.error.message);
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       const response = await axios.post('/login', { email, password });

//       if (response.data && response.data.access_token) {
//         localStorage.setItem('token', response.data.access_token);
//         axios.defaults.headers.common[
//           'Authorization'
//         ] = `Bearer ${response.data.access_token}`;
//         setIsLoggedIn(true);
//         setShowModal(false);
//         setUsername(response.data.username); 
//         resetError();
//       }
//     } catch (error) {
//         setError('Login failed. Please check your email and password.');
//         console.error(error);
//       }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUsername('');

//     // Remove the token from local storage
//     localStorage.removeItem('token');

//     // Remove the default authorization header from axios
//     delete axios.defaults.headers.common['Authorization'];
//   };

//   return (
//     <div className='navbar'>
//       <div className='navbar-left'>GPT Fitness</div>
//       <div className='navbar-right'>
//         {!isLoggedIn ? (
//           <>
//             <button
//               className='nav-action-btn'
//               onClick={() => {
//                 setShowModal(!showModal);
//                 resetError();
//               }}
//             >
//               Signup/Login
//             </button>
//             {showModal && (
//               <div className='modal'>
//                 {error && <div className='error-message'>{error}</div>}
//                 {isLoginMode ? (
//                   <>
//                     <h2>Login</h2>
//                     <form onSubmit={handleLoginSubmit}>
//                       <input
//                         type='text'
//                         name='email'
//                         placeholder='email'
//                         required
//                       />
//                       <input
//                         type='password'
//                         name='password'
//                         placeholder='Password'
//                         required
//                       />
//                       <button type='submit'>Login</button>
//                     </form>
//                     <button
//                       className='switch-btn'
//                       onClick={() => setIsLoginMode(false)}
//                     >
//                       Switch to Signup
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <h2>Signup</h2>
//                     <form onSubmit={handleSignupSubmit}>
//                       <input
//                         type='text'
//                         name='username'
//                         placeholder='Username'
//                         required
//                       />
//                       <input
//                         type='email'
//                         name='email'
//                         placeholder='Email'
//                         required
//                       />
//                       <input
//                         type='password'
//                         name='password'
//                         placeholder='Password'
//                         required
//                       />
//                       <button type='submit'>Signup</button>
//                     </form>
//                     <button
//                       className='switch-btn'
//                       onClick={() => setIsLoginMode(true)}
//                     >
//                       Switch to Login
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}
//           </>
//         ) : (
//           <>
//             <button
//               className='nav-action-btn'
//               onClick={() => {
//                 setShowModal(!showModal);
//                 resetError();
//               }}
//             >
//               {username}
//             </button>
//             {showModal && (
//               <div className='modal'>
//                 <button className='modal-action-btn' onClick={handleLogout}>
//                   Logout
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EntireNavCode;
