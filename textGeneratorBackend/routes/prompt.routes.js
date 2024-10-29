const router =require('express').Router()
const  { getAllPrompts, getPrompt, deletePrompt, updatePrompt } = require('../controllers/prompt.controller.js')
const { checkAuth } = require('../middlewares/auth.middleware.js')


router.get('/', checkAuth, getAllPrompts)
router.get('/:promptId', checkAuth, getPrompt)
router.delete('/:userId', checkAuth, deletePrompt)
router.put('/:userId', checkAuth, updatePrompt)

module.exports = router