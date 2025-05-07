import express from 'express';
import { body } from 'express-validator';
import { bookRoom, checkBooking, displayRooms, changeBookStatus } from '../controllers/bookController.js';

const router = express.Router();

router.post(
  '/book',
  [
    body('room_id').notEmpty(),
    body('username').notEmpty(),
    body('start_time').notEmpty().isISO8601(),
    body('end_time').notEmpty().isISO8601(),
  ],
  bookRoom
);

router.post(
    '/check',
    [
      body('room_id').notEmpty(),
      body('start_time').notEmpty().isISO8601(),
      body('end_time').notEmpty().isISO8601(),
    ],
    checkBooking
);

router.get('/getRooms',
    [
        query('date').optional().isISO8601()
    ],
    displayRooms
);

router.put(
  '/booking/status',
  [
    body('booking_id').notEmpty().isInt(),
    body('new_status').notEmpty(),
    body('username').notEmpty()
  ],
  changeBookStatus
);

export default router;