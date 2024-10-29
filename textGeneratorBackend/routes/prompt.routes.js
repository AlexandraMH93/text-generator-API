const router =require('express').Router()
const  { getAllPrompts, getPrompt, deletePrompt, updatePrompt, getPromptByUser } = require('../controllers/prompt.controller.js')
const { checkAuth } = require('../middlewares/auth.middleware.js')


router.get('/', checkAuth, getAllPrompts)
router.get('/:promptId', checkAuth, getPrompt)

router.delete('/:promptId', checkAuth, deletePrompt)

router.put('/:promptId', checkAuth, updatePrompt)


module.exports = router