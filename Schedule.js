import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Schedule() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/schedule', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchedule(response.data);
    };

    fetchSchedule();
  }, []);

  return (
    <div>
      <h2>Your Schedule</h2>
      <ul>
        {schedule.map((item, index) => (
          <li key={index}>{item.day}: {item.shift}</li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;
