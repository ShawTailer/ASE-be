require('dotenv').config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:your_secure_password@localhost:3306/scams',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};