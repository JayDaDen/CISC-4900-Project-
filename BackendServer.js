// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

const db = new sqlite3.Database('./database.db');
app.use(express.json());

// Mark a shift as available (Drop Shift)
app.patch('/shifts/:id/drop', (req, res) => {
  const shiftId = req.params.id;
  db.run('UPDATE shifts SET is_available = 1 WHERE id = ?', [shiftId], function (error) {
    if (error) {
      res.status(500).json({ error: 'Failed to drop shift' });
    } else {
      res.status(200).json({ message: 'Shift made available for pickup' });
    }
  });
});

// Transfer shift ownership (Pickup Shift)
app.post('/shifts/:id/pickup', (req, res) => {
  const shiftId = req.params.id;
  const newOwnerId = req.body.newOwnerId; // ID of the user picking up the shift

  // Check if the shift is available for pickup
  db.get('SELECT * FROM shifts WHERE id = ? AND is_available = 1', [shiftId], (error, shift) => {
    if (error || !shift) {
      res.status(404).json({ error: 'Shift not available for pickup' });
    } else {
      // Transfer ownership by updating owner_id and setting is_available to 0
      db.run('UPDATE shifts SET owner_id = ?, is_available = 0 WHERE id = ?', [newOwnerId, shiftId], function (err) {
        if (err) {
          res.status(500).json({ error: 'Failed to transfer shift ownership' });
        } else {
          res.status(200).json({ message: 'Shift successfully picked up by new owner' });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
