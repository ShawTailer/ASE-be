export default (sequelize, DataTypes) => {
    return sequelize.define('Rooms', {
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
};