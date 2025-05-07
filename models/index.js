const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.js');
const UserModel = require('./User.js');
const RoomModel = require('./Rooms.js');
const BuildingModel = require('./Buildings.js');
const BookingModel = require('./Bookings.js');

const sequelize = new Sequelize(dbConfig.DATABASE_URL, {
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = UserModel(sequelize, DataTypes);
db.Room = RoomModel(sequelize, DataTypes);
db.Building = BuildingModel(sequelize, DataTypes);
db.Booking = BookingModel(sequelize, DataTypes);

Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;