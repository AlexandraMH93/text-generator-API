const { DataTypes } = require('sequelize')
const sequelize = require('../db/index.js')

const Prompt = sequelize.define('prompt', {
    textPrompt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
}

)

module.exports = Prompt