const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('./config/db.js');

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
$db.sequelize = sequelize;

// User model
db.User = require('./User.js')(sequelize, DataTypes);
// Room model
db.Room = require('./Rooms.js')(sequelize, DataTypes);
// Building model
db.Building = require('./Buildings.js')(sequelize, DataTypes);
module.exports = db;