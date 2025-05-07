const { validationResult } = require('express-validator');
const db = require('../models/index.js');
const { Op } = require('sequelize');

exports.bookRoom = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    const { room_id, username, start_time, end_time } = req.body;
    const room = await db.Room.findByPk(room_id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const user = await db.User.findByPk(username);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.role !== 'teacher') {
      return res.status(403).json({ error: 'Only teachers can book rooms' });
    }

    const overlap = await db.Booking.findOne({
      where: {
        room_id,
        status: 'confirmed',
        [Op.or]: [
          {
            start_time: { [Op.lt]: new Date(end_time) },
            end_time: { [Op.gt]: new Date(start_time) }
          }
        ]
      }
    });

    if (overlap) {
      return res.status(409).json({ error: 'Room is already booked during that time' });
    }

    const booking = await db.Booking.create({
      room_id,
      user: username,
      status: 'pending',
      start_time,
      end_time
    });

    return res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};

exports.checkBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    const { room_id, start_time, end_time } = req.body;
    const room = await db.Room.findByPk(room_id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    if (!room.available) return res.status(400).json({ error: 'Room is not available' });

    const overlap = await db.Booking.findOne({
      where: {
        room_id,
        status: 'confirmed',
        [Op.or]: [
          {
            start_time: { [Op.lt]: new Date(end_time) },
            end_time: { [Op.gt]: new Date(start_time) }
          }
        ]
      }
    });

    if (overlap) {
      return res.status(409).json({ error: 'Room is already booked during that time' });
    }
    return res.status(200).json({ message: 'Room is available for booking' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};

exports.displayRooms = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    const { date } = req.query;
    let startOfDay, endOfDay;
    if (date) {
      startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
    }

    const rooms = await db.Room.findAll({
      include: [
        {
          model: db.Booking,
          as: 'bookings',
          required: false,
          where: date ? {
            start_time: { [Op.lt]: endOfDay },
            end_time: { [Op.gt]: startOfDay }
          } : undefined,
          attributes: ['start_time', 'end_time', 'status']
        },
        {
          model: db.Building,
          as: 'building',
          attributes: ['name', 'description', 'location']
        }
      ],
      attributes: ['room_id', 'room_number', 'building_id', 'available']
    });
    return res.status(200).json({ rooms });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};

exports.changeBookStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    const { booking_id, new_status, username } = req.body;

    if (!['confirmed', 'cancelled'].includes(new_status)) {
      return res.status(400).json({ error: 'Invalid booking status' });
    }

    const booking = await db.Booking.findByPk(booking_id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    if (booking.user !== username) {
      return res.status(403).json({ error: 'You can only change your own bookings' });
    }

    booking.status = new_status;
    await booking.save();

    const room = await db.Room.findByPk(booking.room_id);
    const user = await db.User.findByPk(username);

    console.log(`Notification to ${user.email || user.phone_num}:`);
    console.log(`Your booking for Room ${room.room_number} has been ${new_status}.`);
    console.log(`Time: ${booking.start_time} to ${booking.end_time}`);

    return res.status(200).json({ message: 'Booking status updated', booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};