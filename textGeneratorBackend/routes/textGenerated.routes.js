const router =require('express').Router()
const  { getAllTextGenerateds, getTextGenerated, deleteTextGenerated, updateTextGenerated } = require('../controllers/textGenerated.controller.js')
const { checkAuth } = require('../middlewares/auth.middleware.js')


router.get('/', checkAuth, getAllTextGenerateds)
router.get('/:textGeneratedId', checkAuth, getTextGenerated)
router.delete('/:textGeneratedId', checkAuth, deleteTextGenerated)
router.put('/:textGeneratedId', checkAuth, updateTextGenerated)

module.exports = router