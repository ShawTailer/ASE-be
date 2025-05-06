import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/book.js';

dotenv.config();
const app = express();

// Connect & sync
try {
  await db.sequelize.authenticate();
  console.log('MySQL connected');
  await db.sequelize.sync();
} catch (err) {
  console.error('Unable to connect to MySQL:', err);
  process.exit(1);
}

// Middleware
app.use(express.json());
// Auth routes
app.use('/api/auth', authRoutes);
// Book routes
app.use('/api/booking', bookRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));