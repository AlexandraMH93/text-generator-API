const TextGenerated = require('../models/textGenerated.model')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

async function getAllTextGenerateds(req, res) {
  try {
    if (!Object.values(req.query).length) {
      const textGenerated = await TextGenerated.findAll()

      if (textGenerated) {
        return res.status(200).json(textGenerated)
      } else {
        return res.status(404).send('No text generated found')
      }
    } else {
      const textGenerated = await TextGenerated.findAll({
        where: {
          [Op.and]: [
            req.query
          ]
        }
      })
      if (textGenerated.length !== 0) {
        return res.status(200).json(textGenerated)
      } else {
        return res.status(404).send('No text found')
      }
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


const getTextGenerated = async (req, res) => {

  try {
    const textGenerated = await TextGenerated.findByPk(req.params.textGeneratedId)
    if (textGenerated) res.status(200).json(textGenerated)
  } catch (error) {
    res.status(500).send("Error getting text")
  }

}

const deleteTextGenerated = async (req, res) => {

  try {
    console.log(req.params.textGeneratedId)
    const textGenerated = await TextGenerated.destroy({ where: { id: req.params.textGeneratedId } })
    if (!textGenerated) return res.status(400).send("Text not found")
    res.status(200).send("Text deleted")
  } catch (error) {
    res.status(500).send("Error deleting text")
  }

}

const updateTextGenerated = async (req, res) => {

  try {

    if (req.body.hasOwnProperty("password")) {

      const genSalt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT))
      req.body.password = await bcrypt.hash(req.body.password, genSalt)

    }

    const textGenerated = await TextGenerated.update(req.body, {
      returning: true,
      where: {
        id: req.params.textGeneratedId
      }
    })
    if (!textGenerated) return res.status(400).send("Text not found")
    res.status(200).send("Text updated")

  } catch (error) {
    res.status(500).send("Error updating text")

  }

}


module.exports = { getAllTextGenerateds, getTextGenerated, deleteTextGenerated, updateTextGenerated }