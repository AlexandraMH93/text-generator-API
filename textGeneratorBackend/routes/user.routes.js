const router =require('express').Router()
const {getAllUsers, getUser, deleteUser, updateUser, getProfile, updateProfile, deleteProfile, UserCreatePromptAndTextGenerated, getHistory} = require('../controllers/user.controller.js')
const { checkAuth } = require('../middlewares/auth.middleware.js')

router.get('/', checkAuth, getAllUsers)
router.get('/:userId', checkAuth, getUser)
router.delete('/:userId', checkAuth, deleteUser)
router.put('/:userId', checkAuth, updateUser)

router.get('/profile', checkAuth,  getProfile)
router.put('/profile', checkAuth,   updateProfile)
router.delete('/profile', checkAuth,  deleteProfile)

router.post('/promptAndTextGenerated', checkAuth, UserCreatePromptAndTextGenerated)
router.get('/history', checkAuth, getHistory)


module.exports= router