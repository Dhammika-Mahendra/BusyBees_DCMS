import React from 'react';
import { useForm } from 'react-hook-form';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { Toolbar, Typography, IconButton } from '@mui/material';

const LoginPage = ({ setIsLoggedIn }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Sending a POST request
      const response = await fetch('http://localhost:8080/log', {
        method: 'POST', // Use the POST method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(data), // Convert form data to JSON format
      });

      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      let result;

      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        // Handle non-JSON response (e.g., plain text)
        const text = await response.text();
        result = { message: text };
      }

      console.log('Login result:', result);
      if (response.ok) {
        setIsLoggedIn(true); // Set logged-in state to true
        // alert(result.message);
      } else {
        // alert(result.message); // Error message from server
      }
    } catch (error) {
      // alert('Error connecting to the server: ' + error); // Handle network or other errors
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton>
          <div>
            <ChildCareIcon sx={{ color: '#FFFFFF', fontSize: 160, mr: 1, marginLeft: 30, marginTop: 10 }} />
          </div>
          <div>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1, color: '#FFFFFF', fontWeight: 'bold', marginLeft: -35, marginTop: 40, fontSize: 90 }}
            >
              BusyBees
            </Typography>
          </div>
        </Toolbar>
      </div>

      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
