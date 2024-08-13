const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { User } = require('./models');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    req.session.userId = user.user_id;
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.session.userId = user.user_id;
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Middleware to protect routes
function authMiddleware(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Example protected route
app.get('/api/expenses', authMiddleware, async (req, res) => {
  const expenses = await Expense.findAll({ where: { user_id: req.session.userId } });
  res.json(expenses);
});

