import React, { useState } from 'react';

function Schedule() {
  const [schedule, setSchedule] = useState([
    { day: 'Monday', shift: '9:00 AM - 5:00 PM' },
    { day: 'Tuesday', shift: '10:00 AM - 6:00 PM' },
  ]);

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
