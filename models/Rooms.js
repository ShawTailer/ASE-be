export default (sequelize, DataTypes) => {
    const rooms = sequelize.define('Rooms', {
        room_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        room_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        building_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'rooms',
    });
    
    rooms.associate = models => {
        rooms.belongsTo(models.Buildings, {
            foreignKey: 'building_id',
            as: 'buildings'
        });
    };

    return rooms;
};