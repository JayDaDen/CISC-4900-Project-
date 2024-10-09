import React, { useEffect, useState } from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const guestLogin = localStorage.getItem('guest');

    if (guestLogin) {
      setUserName('Guest');
    } else if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || 'User');
      } catch (error) {
        console.error('Invalid token', error);
        localStorage.removeItem('token');
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('guest');
    navigate('/');
  };

  return (
    <Card style={{ padding: '20px', marginTop: '20px' }}>
      <CardContent>
        <Typography variant="h3" gutterBottom style={{ textAlign: 'left', color: '#d32f2f' }}>
          Worksite Scheduler
        </Typography>
        <Typography variant="h4" gutterBottom>
          Welcome, {userName}!
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          style={{ marginTop: '20px' }}
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
