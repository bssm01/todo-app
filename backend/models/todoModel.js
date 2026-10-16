import mongoose from "mongoose";
import joi from "joi";

const schema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true,
    }
})

const todoValidation = (obj) =>{
    const schema = joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        status: joi.boolean().default(false)
    })
    return schema.validate(obj);
}

const todoUpdateValidation = (obj) =>{
    const schema = joi.object({
        title: joi.string(),
        description: joi.string(),
        status: joi.boolean().default(false)
    })
    return schema.validate(obj);
}

const Todo = mongoose.model("Todo" , schema);

export {Todo, todoValidation , todoUpdateValidation };