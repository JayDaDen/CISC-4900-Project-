import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';  // Assuming the styling is in Dashboard.css

const Dashboard = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const guest = localStorage.getItem('guest');
    if (guest === 'true') {
      setName('Guest');
    } else {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');  // Redirect to login if no token or guest flag
      } else {
        // Fetch user info using token if available
        // Assuming you fetch user info from token, here you can decode the token for the user's name
        setName('User');  // Replace with decoded token or fetched user data
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('guest');  // Remove guest flag on logout
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="welcome-message">Welcome, {name}!</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      
      <section className="shift-details">
        <div className="shift-card">
          <h2>Next Shift</h2>
          <p>Date: Friday, October 4th</p>
          <p>Time: 9:00 AM - 5:00 PM</p>
          <p>Location: General Merchandise</p>
          <button className="view-button">View Full Schedule</button>
        </div>
        <div className="shift-card">
          <h2>Total Hours This Week</h2>
          <p>32 hours</p>
          <button className="view-button">View Timesheet</button>
        </div>
      </section>

      <section className="shift-actions">
        <div className="swap-shifts">
          <h2>Swap Shifts</h2>
          <p>You have 0 initiated shift swap requests.</p>
          <button className="action-button">Initiate Swap Request</button>
        </div>
        <div className="available-shifts">
          <h2>Available Shifts</h2>
          <p>2 shifts available to pick up.</p>
          <button className="action-button">View Available Shifts</button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
