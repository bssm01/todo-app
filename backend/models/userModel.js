import mongoose from "mongoose";
import joi from "joi";

const schema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    resetTokenHash:{
        type:String,
        select :false
    },
    resetTokenExpires:{
        type : Date,
        select : false
    }

});

const registerValidation = (obj) =>{
    const schema = joi.object({
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    })
    return schema.validate(obj);
}

const loginValidation = (obj) =>{
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    })
    return schema.validate(obj);
}
const emailValidation =(obj)=>{
    const schema = joi.object({
        email: joi.string().email().required()
    })
    return schema.validate(obj);
}

const User = mongoose.model("User" , schema);

export {User, registerValidation, loginValidation , emailValidation};