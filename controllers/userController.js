const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User,validate} = require('../models/user')

module.exports.newUser = async(req, res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send({msg:error.details[0].message})

    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send({msg:"User already registered."})

    user = new User(_.pick(req.body, ["name","email","password"]))

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    const token = user.generateJWT()

    try{
        const result = await user.save()
        return res.status(201).send({
            token:token,
            data:_.pick(result,["_id","email"]),
            msg:"Successfully created!"
        })

    }catch(err){
        const errMsg = []
        for(let field in err.errors){
            errMsg.push(err.errors[field].message)
        }
        return res.status(400).send({msg:errMsg})
    }

}
module.exports.loginUser = async(req, res)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send({msg:"Invalid email or password"})

    const validUser = await bcrypt.compare(req.body.password, user.password)
    if(!validUser) return res.status(400).send({msg:"Invalid email or password"})

    try{
        const token = user.generateJWT()
        return res.status(200).send({
            token:token,
            data:_.pick(user, ["_id",'name',"email"]),
            msg:"Successfully Login!"
        })

    }catch(err){
        return res.status(400).send({msg:"Invalid email or password"})
    }
}