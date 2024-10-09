import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';  
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      localStorage.setItem('token', response.data.token);  // Store token in localStorage
      localStorage.removeItem('guest');  // Remove guest flag if it was set
      navigate('/dashboard');  // Redirect to dashboard
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('guest', 'true');  // Set a guest flag in localStorage
    localStorage.removeItem('token');  // Clear any token if it exists
    navigate('/dashboard');  // Redirect to dashboard
  };

  return (
    <Card style={{ maxWidth: 400, margin: 'auto', padding: '20px', marginTop: '50px' }}>
      <CardContent>
        <Typography 
          variant="h3" 
          component="div" 
          gutterBottom 
          style={{ textAlign: 'center', color: '#d32f2f', marginBottom: '20px' }}
        >
          Worksite Scheduler
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            style={{ marginTop: '20px' }}
          >
            Login
          </Button>
        </form>
        <Button 
          onClick={handleGuestLogin} 
          variant="outlined" 
          color="secondary" 
          fullWidth 
          style={{ marginTop: '20px' }}
        >
          Login as Guest
        </Button>
        <Typography style={{ marginTop: '10px' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Login;
