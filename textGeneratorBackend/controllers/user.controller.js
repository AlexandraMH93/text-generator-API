
const User = require('../models/user.model')
const Prompt = require('../models/prompt.model')
const TextGenerated = require('../models/textGenerated.model')

const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

async function getAllUsers(req, res) {
  try {
    if (!Object.values(req.query).length) {
      const user = await User.findAll()

      if (user) {
        return res.status(200).json(user)
      } else {
        return res.status(404).send('No users found')
      }
    } else {
      const user = await User.findAll({
        where: {
          [Op.and]: [
            req.query
          ]
        }
      })
      if (user.length !== 0) {
        return res.status(200).json(user)
      } else {
        return res.status(404).send('No users found')
      }
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (user) res.status(200).json(user)
  } catch (error) {
    res.status(500).send("Error getting user")
  }
}

const deleteUser = async (req, res) => {
  try {
    console.log(req.params.userId)
    const user = await User.destroy({ where: { id: req.params.userId } })
    if (!user) return res.status(400).send("User not found")
    res.status(200).send("User deleted")
  } catch (error) {
    res.status(500).send("Error deleting user")
  }
}

const updateUser = async (req, res) => {
  try {

    if (req.body.hasOwnProperty("password")) {

      const genSalt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT))
      req.body.password = await bcrypt.hash(req.body.password, genSalt)
    }

    const user = await User.update(req.body, {
      returning: true,
      where: {
        id: req.params.userId
      }
    })
    if (!user) return res.status(400).send("User not found")
    res.status(200).send("User updated")

  } catch (error) {
    res.status(500).send("Error updating user")
  }
}

const getProfile = async (req, res) => {
  try {
    const user = res.locals.user
    res.status(200).send({ userInfo: user })
  } catch (error) {
    res.status(500).send(error.message)
  }
}


const updateProfile = async (req, res) => {
  try {
    const user = res.locals.user
    if (req.body.hasOwnProperty("password")) {

      const genSalt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT))
      req.body.userInfo.password = await bcrypt.hash(req.body.userInfo.password, genSalt)

    }
    let token = jwt.sign({ email: req.body.userInfo.email }, process.env.JWT_SECRET)

    await user.update(req.body.userInfo)

    res.status(200).json(token)
  }
  catch (error) {

    res.status(500).send(error.message)
  }
}


const deleteProfile = async (req, res) => {
  try {
    const user = res.locals.user
    const userDeleted = await user.destroy()
    res.status(200).send("Profile deleted")
  } catch (error) {
    res.status(500).send(error.message)
  }

}

async function UserCreatePromptAndTextGenerated(req, res) {
  try {
      const user = res.locals.user

      if (!user) return res.status(400).json('User not found')

      const prompt = await Prompt.create({ textPrompt: req.body.textPrompt })
      await user.addPrompt(prompt)

      const generatedText = req.body.textGenerated
      const textGenerated = await TextGenerated.create({ textGenerated: generatedText, prompt_id: prompt.id })

      return res.status(200).json({
          message: 'Prompt and generated text created successfully',
          prompt: prompt,
          textGenerated: textGenerated
      });
  } catch (error) {
      res.status(500).send(error.message);
  }
}

async function getUserPromptsAndTextGenerateds(req, res) {
  try {
    const user = res.locals.user
    if (!user) return res.status(404).send('No user found')

    const prompts = await user.getPrompts({
        include: {
            model: TextGenerated,
            as: 'textGenerated'
        }
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

module.exports = { getAllUsers, getUser, deleteUser, updateUser, updateProfile, deleteProfile, getProfile, UserCreatePromptAndTextGenerated, getUserPromptsAndTextGenerateds }