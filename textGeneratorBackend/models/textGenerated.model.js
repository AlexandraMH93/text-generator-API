const { DataTypes } = require('sequelize')
const sequelize = require('../db/index.js')

const TextGenerated = sequelize.define('textGenerated', {
    textGenerated: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
}

)

module.exports = TextGenerated