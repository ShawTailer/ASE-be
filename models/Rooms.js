module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
      room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      room_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      building_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      tableName: 'rooms',
      timestamps: false
    });
  
    Room.associate = models => {
      Room.belongsTo(models.Building, {
        foreignKey: 'building_id',
        as: 'building'
      });
      Room.hasMany(models.Booking, {
        foreignKey: 'room_id',
        as: 'bookings'
      });
    };
  
    return Room;
  };