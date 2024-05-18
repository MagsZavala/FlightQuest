const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Flight extends Model {}

    Flight.init({
        flightNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Flight',
        timestamps: false
    });

    return Flight;
};
