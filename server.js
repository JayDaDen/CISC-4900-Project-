const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Dummy data
let schedule = [
  { day: 'Monday', shift: '9:00 AM - 5:00 PM' },
  { day: 'Tuesday', shift: '10:00 AM - 6:00 PM' }
];

app.get('/schedule', (req, res) => {
  res.json(schedule);
});

app.post('/time-off', (req, res) => {
  const { day, reason } = req.body;
  // Process time-off request (here we just log it)
  console.log(`Time-off requested for ${day}: ${reason}`);
  res.json({ message: 'Time-off request submitted!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
