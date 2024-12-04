const mongoose = require("mongoose")

// creating schema

const userSchema = mongoose.Schema({
    firstName:{
        required:true,
        type:String,
        minLength:3,
        maxLength:50
    },
    lastName:{
        required:true,
        type:String,
        minLength:3,
        maxLength:50
    },
    email:{
        required:true,
        type:String,
        minLength:3,
        maxLength:50,
        unique:true
    },
    password:{
        required:true,
        type:String,
        minLength:8,
        maxLength:150,
    },
})

module.exports = mongoose.model("User", userSchema)