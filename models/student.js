const {Schema, model} = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const studentSchema = Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255
    },
    class:{
        type:String,
        required:true,
    },
    roll:{
        type:String,
        required:true,
        unique:true
    },
    reg:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    }
})

const Student = model("Student", studentSchema)
module.exports.Student = Student
