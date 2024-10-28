const router =require('express').Router()
const {getAllUsers, getUser, deleteUser, updateUser} = require('../controllers/user.controller.js')
const { checkAuth } = require('../middlewares/auth.middleware.js')

router.get('/', checkAuth, getAllUsers)
router.get('/:userId', checkAuth, getUser)
router.delete('/:userId', checkAuth, deleteUser)
router.put('/:userId', checkAuth, updateUser)

module.exports= router