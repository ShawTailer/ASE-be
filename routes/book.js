const express = require('express');
const { body, query } = require('express-validator');
const { bookRoom, checkBooking, displayRooms, changeBookStatus } = require('../controllers/bookController.js');

const router = express.Router();

router.post(
  '/book',
  [
    body('room_id').notEmpty().isInt(),
    body('username').notEmpty(),
    body('start_time').notEmpty().isISO8601(),
    body('end_time').notEmpty().isISO8601()
  ],
  bookRoom
);

router.post(
  '/check',
  [
    body('room_id').notEmpty().isInt(),
    body('start_time').notEmpty().isISO8601(),
    body('end_time').notEmpty().isISO8601()
  ],
  checkBooking
);

router.get(
  '/getRooms',
  [
    query('date').optional().isISO8601()
  ],
  displayRooms
);

router.put(
  '/booking/status',
  [
    body('booking_id').notEmpty().isInt(),
    body('new_status').notEmpty().isIn(['confirmed', 'cancelled']),
    body('username').notEmpty()
  ],
  changeBookStatus
);

module.exports = router;