export default (sequelize, DataTypes) => {
    const buildings = sequelize.define('Buildings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'buildings',
        timestamps: false
    });

    buildings.associate = models => {
        buildings.hasMany(models.rooms, {
            foreignKey: 'building_id',
            as: 'rooms'
        });
    };
    return buildings;
};