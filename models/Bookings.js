import { model } from "mongoose";

export default (sequelize, DataTypes) => {
    const book = sequelize.define('Bookings', {
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
        },
    }, {
        tableName: 'bookings',
        timestamps: true,
        created_at: 'created_at',
        updated_at: 'booking_changed_at',
    });

    book.associate = models => {
        book.belongsTo(models.Rooms, {
            foreignKey: 'room_id',
        });

        book.belongsTo(models.User, {
            foreignKey: 'user',
        });
    };

    return book
};