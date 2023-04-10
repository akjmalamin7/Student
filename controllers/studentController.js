const _ = require('lodash')
const {Student} = require('../models/student')

module.exports.newStudent = async(req, res)=>{
    let student = await Student.findOne({email:req.body.email})
    if(student) return res.status(400).send({msg:"Student already registered."})

    student = new Student(_.pick(req.body, ["name","class","roll","reg","phone","email","password"]))

    try{
        const result = await student.save()
        return res.status(201).send({
            data:_.pick(result,["_id","roll","reg","phone"]),
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

module.exports.allStudents = async(req, res) =>{
    try{
        const student = await Student.find().sort({name:-1})
        if(student.length <= 0) return res.status(400).send({msg:"Student not found!"})
        return res.status(200).send(student)
    }catch(err){
        return res.status(400).send({msg:"Student not found!"})
    }
}