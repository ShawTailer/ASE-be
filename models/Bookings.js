module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('cancelled', 'pending', 'confirmed'),
        allowNull: false
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      tableName: 'bookings',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    Booking.associate = models => {
      Booking.belongsTo(models.Room, {
        foreignKey: 'room_id',
        as: 'room'
      });
      Booking.belongsTo(models.User, {
        foreignKey: 'user',
        as: 'bookedBy' // Changed from 'user' to 'bookedBy'
      });
    };
  
    return Booking;
  };