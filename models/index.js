import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/db.js';
import UserModel from './User.js';

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

export default db;