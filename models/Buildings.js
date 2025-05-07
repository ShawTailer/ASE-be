module.exports = (sequelize, DataTypes) => {
    const Building = sequelize.define('Building', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'buildings',
      timestamps: false
    });
  
    Building.associate = models => {
      Building.hasMany(models.Room, {
        foreignKey: 'building_id',
        as: 'rooms'
      });
    };
  
    return Building;
  };