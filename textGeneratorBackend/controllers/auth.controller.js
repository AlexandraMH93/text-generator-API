const User= require('../models/user.model.js')
const jwt= require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const signUp = async (req, res)=>{

    try {
        const body = req.body
        
        const genSalt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT))
        body.password= await  bcrypt.hash(body.password, genSalt)
        
        const user = await User.create(body)
        
        const token = jwt.sign({ email:body.email }, process.env.JWT_SECRET )
        res.locals.user=user
        res.status(200).json({token: token })
    } catch (error) {
        res.status(500).send(error.message)
    }
}


const login = async (req, res)=>{
    try {
        const user= await User.findOne({where : {email: req.body.email}})
        if(!user) return res.status(400).send("Invalid email")
        bcrypt.compare(req.body.password, user.password, async (err, result) => {
            if(err) return res.status(500).send("Error, invalid password")
            if(result) {
        
                const token = jwt.sign({ email: req.body.email  }, process.env.JWT_SECRET)
                return res.status(200).json({token: token })
            }
            res.status(400).send("Invalid password")

        });
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports= {login,signUp}