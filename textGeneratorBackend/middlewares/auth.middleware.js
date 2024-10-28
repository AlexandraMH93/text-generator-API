const jwt = require('jsonwebtoken')

const User = require('../models/user.model')


const checkAuth = (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(500).send('Unauthorized') //headers de postman

        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, async (err, payload) => {
            if (err) return res.status(500).send('Unauthorized')
            const user = await User.findOne({
                where: {
                    email: payload.email,
                    role: payload.role
                }
            })
            if (!user) return res.status(500).send('Unauthorized')
            res.locals.user = user
            next()
        })
    } catch (error) {

        res.status(500).send('Unauthorized')
    }


}


module.exports = {  checkAuth }