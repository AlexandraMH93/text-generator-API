const sequelize = require('./index.js')
const User = require('../models/user.model.js')
const Prompt = require('../models/prompt.model.js')
const TextGenerated = require('../models/textGenerated.model.js')


const dbCheck = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connected to Text generator database")
    }
    catch (err) {
        throw new Error(err)
    }
}

const dbSync = async () => {
    try {
      sequelize.sync({alter:true})
       
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = { dbCheck, dbSync }