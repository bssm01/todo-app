import {Todo , todoValidation , todoUpdateValidation} from "../models/todoModel.js";



export const createTodo = async (req,res)=>{
    const {error} = todoValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});
    const todo = await Todo.create({
        title : req.body.title,
        description : req.body.description,
        userId:req.userId
    });
    return res.status(201).json({message: "Todo created successfully", todo: todo});
}

//get all my todos
export const getAllTodo = async(req,res)=>{
    const todos = await Todo.find({userId:req.userId})
    if(todos==null){
        return res.status(400).json({message:"there is no product"})
    }
    return res.status(200).json(todos)
}

//get a todo 
export const getTodo = async(req,res)=>{
    const todo = await Todo.findById(req.params.id)
    if(!todo){
        return res.status(400).json({message:"product not found"})
    }
    return res.status(200).json({todo})
}

//update todo 
export const updateTodo = async(req,res)=>{
    const todoId = req.params.id
    const {error} = todoUpdateValidation(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    const todo = await Todo.findByIdAndUpdate(todoId , req.body , {new:true})
    if(!todo){
        return res.status(404).json({message:"todo not found"})
    }

    return res.status(200).json({todo , message:"updated successfuly" })

}

//delete todo
export const deleteTodo = async(req,res)=>{
    const todo = await Todo.findOneAndDelete({_id:req.params.id , userId:req.userId})
    if(!todo){
        return res.status(400).json({message:"todo not found"})
    }
    return res.status(200).json({message:"todo deleted"})
}
