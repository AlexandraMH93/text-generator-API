const { DataTypes } = require('sequelize')
const sequelize = require('../db/index.js')

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    secondLastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true

        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: { args: [9, 11], msg: 'The phone number is not valid' },
            isInt: { args: true, msg: "You must enter a phone number" },
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

)

module.exports = User