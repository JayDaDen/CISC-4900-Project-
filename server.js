const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',  // Frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// SQLite database connection
const db = new sqlite3.Database('./worksite_scheduling.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);
  }
});

const secretKey = 'secret';

// Register route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run(
    'INSERT INTO employees (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.json({ message: 'User registered successfully!' });
    }
  );
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM employees WHERE email = ?', [email], (err, employee) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging in' });
    }
    if (!employee) {
      return res.status(400).json({ message: 'Employee not found' });
    }

    const isValidPassword = bcrypt.compareSync(password, employee.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: employee.id, name: employee.name }, secretKey, { expiresIn: '1h' });
    res.send({ token });
  });
});

// Start server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
