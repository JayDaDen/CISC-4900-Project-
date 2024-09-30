const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'password', 
  database: 'worksite_scheduling',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

const secretKey = 'secret';

// Register
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO employees (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error during registration:', err);
      return res.status(500).json({ message: 'Error registering user' });
    }
    res.json({ message: 'User registered successfully!' });
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM employees WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) throw err;
    const employee = results[0];
    if (!employee) return res.status(400).send('Employee not found');

    const isValidPassword = bcrypt.compareSync(password, employee.password);
    if (!isValidPassword) return res.status(400).send('Invalid password');

    const token = jwt.sign({ id: employee.id }, secretKey, { expiresIn: '1h' });
    res.send({ token });
  });
});

// Fetch Schedule
app.get('/schedule', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, secretKey);

  const query = 'SELECT * FROM schedules WHERE employee_id = ?';
  db.query(query, [decoded.id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
