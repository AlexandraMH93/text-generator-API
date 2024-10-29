const router =require('express').Router()
const {getAllUsers, getUser, deleteUser, updateUser, getProfile, updateProfile, deleteProfile, UserCreatePromptAndTextGenerated, getHistory} = require('../controllers/user.controller.js')
const { checkAuth } = require('../middlewares/auth.middleware.js')

router.get('/profile', checkAuth,  getProfile)
router.get('/history', checkAuth, getHistory)
router.get('/:userId', checkAuth, getUser)
router.get('/', checkAuth, getAllUsers)

router.delete('/profile', checkAuth,  deleteProfile)
router.delete('/:userId', checkAuth, deleteUser)

router.put('/profile', checkAuth,   updateProfile)
router.put('/:userId', checkAuth, updateUser)

router.post('/promptAndTextGenerated', checkAuth, UserCreatePromptAndTextGenerated)


module.exports= router