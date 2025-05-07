import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/db.js';
import UserModel from './User.js';
import RoomModel from './Rooms.js';
import BuildingModel from './Buildings.js';
import BookingModel from './Bookings.js';
import { models } from 'mongoose';

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false
  }
);

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

export default db;