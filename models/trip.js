const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Trip extends Model {}

    Trip.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        fromCity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        toCity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        departDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        returnDate: {
            type: DataTypes.DATEONLY
        },
        passengersAdults: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        passengersChildren: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        passengersInfants: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        travelClass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        airlineCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        flightDuration: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        }
    }, {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'trip'
    });

    return Trip;
};
