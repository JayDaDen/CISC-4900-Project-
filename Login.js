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
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('guest', 'true');  // Set guest mode flag in localStorage
    navigate('/dashboard');  // Navigate to dashboard as a guest
  };

  return (
    <Card style={{ maxWidth: 400, margin: 'auto', padding: '20px', marginTop: '50px' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Worksite Scheduler
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
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
            Login
          </Button>
        </form>
        <Typography style={{ marginTop: '10px' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={handleGuestLogin}
        >
          Login as Guest
        </Button>
      </CardContent>
    </Card>
  );
}

export default Login;
