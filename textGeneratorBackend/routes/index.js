const router =require('express').Router()
 

router.use('/auth', require('./auth.routes.js'))
router.use('/user', require('./user.routes.js'))
router.use('/prompt', require('./prompt.routes.js'))
router.use('/textGenerated', require('./textGenerated.routes.js'))

module.exports = router