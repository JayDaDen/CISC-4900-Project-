// Schedule.js
import React, { useState, useEffect } from 'react';

const Schedule = () => {
  const [shifts, setShifts] = useState([]);
  const [availableShifts, setAvailableShifts] = useState([]);
  const userId = 1; // Replace with the current user's ID

  useEffect(() => {
    fetchShifts();
    fetchAvailableShifts();
  }, []);

  const fetchShifts = async () => {
    const response = await fetch(`http://localhost:3001/shifts?owner_id=${userId}`);
    const data = await response.json();
    setShifts(data);
  };

  const fetchAvailableShifts = async () => {
    const response = await fetch('http://localhost:3001/available-shifts');
    const data = await response.json();
    setAvailableShifts(data);
  };

  const dropShift = async (shiftId) => {
    try {
      const response = await fetch(`http://localhost:3001/shifts/${shiftId}/drop`, {
        method: 'PATCH'
      });
      if (response.ok) {
        setAvailableShifts([...availableShifts, shifts.find(shift => shift.id === shiftId)]);
        setShifts(shifts.filter(shift => shift.id !== shiftId));
      }
    } catch (error) {
      console.error('Failed to drop shift', error);
    }
  };

  const pickupShift = async (shiftId) => {
    try {
      const response = await fetch(`http://localhost:3001/shifts/${shiftId}/pickup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newOwnerId: userId })
      });
      if (response.ok) {
        const pickedShift = availableShifts.find(shift => shift.id === shiftId);
        setShifts([...shifts, pickedShift]);
        setAvailableShifts(availableShifts.filter(shift => shift.id !== shiftId));
      }
    } catch (error) {
      console.error('Failed to pickup shift', error);
    }
  };

  return (
    <div>
      <h2>Your Schedule</h2>
      <ul>
        {shifts.map(shift => (
          <li key={shift.id}>
            {shift.time}
            <button onClick={() => dropShift(shift.id)}>Drop Shift</button>
          </li>
        ))}
      </ul>

      <h2>Available Shifts</h2>
      <ul>
        {availableShifts.map(shift => (
          <li key={shift.id}>
            {shift.time}
            <button onClick={() => pickupShift(shift.id)}>Pickup Shift</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
