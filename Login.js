import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div class = "container">

      <p class="text">Worksite 2024</p>
        <h1>Welcome Back to Worksite</h1>

        <h2>Please enter your details</h2>

        <p class= "statement">You Work for Us, We Work for You
          
        <br></br>
        <br></br>
        Schedule viewing and editing made simple.</p>  

     <div class = "form">
      <form class = "login-form" onSubmit={handleLogin}>
         <input
            type="email"
           placeholder="Email"
            value={email}
           onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit">Login</button>
      </form>
      </div>
    </div>
  );
}

export default Login;
