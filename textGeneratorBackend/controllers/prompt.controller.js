
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const Prompt = require('../models/prompt.model')
const User = require('../models/user.model')

async function getAllPrompts(req, res) {
  try {
    if (!Object.values(req.query).length) {
      const prompt = await Prompt.findAll()

      if (prompt) {
        return res.status(200).json(prompt)
      } else {
        return res.status(404).send('No prompts found')
      }
    } else {
      const prompt = await Prompt.findAll({
        where: {
          [Op.and]: [
            req.query
          ]
        }
      })
      if (prompt.length !== 0) {
        return res.status(200).json(prompt)
      } else {
        return res.status(404).send('No prompts found')
      }
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


const getPrompt = async (req, res) => {

  try {
    const prompt = await Prompt.findByPk(req.params.promptId)
    if (prompt) res.status(200).json(prompt)
  } catch (error) {
    res.status(500).send("Error getting prompt")
  }

}

const deletePrompt = async (req, res) => {

  try {
    console.log(req.params.promptId)
    const prompt = await Prompt.destroy({ where: { id: req.params.promptId } })
    if (!prompt) return res.status(400).send("prompt not found")
    res.status(200).send("prompt deleted")
  } catch (error) {
    res.status(500).send("Error deleting prompt")
  }

}

const updatePrompt = async (req, res) => {

  try {

    if (req.body.hasOwnProperty("password")) {

      const genSalt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT))
      req.body.password = await bcrypt.hash(req.body.password, genSalt)

    }

    const prompt = await Prompt.update(req.body, {
      returning: true,
      where: {
        id: req.params.promptId
      }
    })
    if (!prompt) return res.status(400).send("prompt not found")
    res.status(200).send("prompt updated")

  } catch (error) {
    res.status(500).send("Error updating prompt")

  }

}

async function getPromptByUser(req, res) {
  try {
    const user = await User.findByPk(parseInt(req.params.id))

      if (!user) return res.status(404).send('No user found');

      const prompts = await Prompt.findAll({
          where: { user_id: user.id },
          // include: [{
          //     model: TextGenerated,
          //     as: 'promptId'
          // }]
      });

      if (prompts && prompts.length > 0) {
          return res.status(200).json(prompts);
      } else {
          return res.status(404).send('No prompts or generated texts found');
      }
  } catch (error) {
      res.status(500).send(error.message);
  }
}

module.exports = { getAllPrompts, getPrompt, deletePrompt, updatePrompt, getPromptByUser }