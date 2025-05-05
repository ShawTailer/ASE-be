export default (sequelize, DataTypes) => {
    return sequelize.define('Bookings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'bookings',
        timestamps: true,
        created_at: 'created_at',
        updated_at: 'booking_changed_at',
        start_time: 'start_time',
        end_time: 'end_time'
    });
};