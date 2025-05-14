const express = require('express');
const dotenv = require('dotenv');
const db = require('./models/index.js');
const authRoutes = require('./routes/auth.js');
const bookRoutes = require('./routes/book.js');
const cors = require('cors');

dotenv.config();
const app = express();

// Connect & sync
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('MySQL connected');
    await db.sequelize.sync({ force: false });
  } catch (err) {
    console.error('Unable to connect to MySQL:', err);
    process.exit(1);
  }
})();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use(express.json());
// Auth routes
app.use('/api/auth', authRoutes);
// Book routes
app.use('/api/booking', bookRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));