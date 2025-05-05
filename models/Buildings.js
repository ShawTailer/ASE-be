export default (sequelize, DataTypes) => {
    return sequelize.define('Buildings', {
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
    });
};