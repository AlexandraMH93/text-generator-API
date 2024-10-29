const sequelize = require('./index.js')
const User = require('../models/user.model.js')
const Prompt = require('../models/prompt.model.js')
const TextGenerated = require('../models/textGenerated.model.js')

const DBRelationships = async() =>{
    try {

        User.hasMany(Prompt, { foreignKey:"user_id"})
        Prompt.belongsTo(User , {as:"userId",foreignKey:"user_id"})

        Prompt.hasOne(TextGenerated ,{ foreignKey:"prompt_id"})
        TextGenerated.belongsTo(Prompt ,{as:"promptId" ,foreignKey:"prompt_id"} )


    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports= DBRelationships