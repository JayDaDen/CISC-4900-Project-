import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import './Schedule.css';  // Import custom styles

const Schedule = () => {
  const shifts = [
    { date: 'Friday, October 4th', time: '9:00 AM - 5:00 PM', location: 'General Merchandise' },
    { date: 'Saturday, October 5th', time: '1:00 PM - 9:00 PM', location: 'Electronics' },
    { date: 'Sunday, October 6th', time: '10:00 AM - 6:00 PM', location: 'Customer Service' },
  ];

  return (
    <div className="schedule-container">
      <Typography variant="h4" className="schedule-title">
        Upcoming Shifts
      </Typography>

      <Grid container spacing={4}>
        {shifts.map((shift, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card className="schedule-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  {shift.date}
                </Typography>
                <Typography variant="body1">
                  Time: {shift.time}
                </Typography>
                <Typography variant="body1">
                  Location: {shift.location}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Schedule;
