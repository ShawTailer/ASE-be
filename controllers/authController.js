import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const { User } = db;

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, name, email, password } = req.body;
  try {
    const existing = await User.findByPk(username);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ username, name, email, password: hashed });
    const token = jwt.sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({
      message: 'Register successful',
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;
  try {
    const user = await User.findByPk(username);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};