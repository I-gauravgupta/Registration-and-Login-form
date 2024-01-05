const express = require("express");
const mongoose= require("mongoose")
const bcrypt= require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true
    }
    ,
    emailId:{
        type: String,
        required:true,
        unique:true
    },
    phoneNo:{
        type: Number,
        required:true,
        unique:true
    },
    gender:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
})

userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10)
    }
    next();

})

const userDetails= new mongoose.model("userDetail",userSchema);

module.exports=userDetails;