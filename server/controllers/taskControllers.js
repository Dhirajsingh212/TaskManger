const jwt = require('jsonwebtoken');
const Task=require('../models/TaskModel');

exports.addTask=async(req,res)=>{
    try{
        const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({
                status:"fail",
                message:"unauthorized access",
            })
        }
        const timestamp=Date.now();

        await Task.create({
            userId:decoded.id,
            task:req.body.task,
            time:timestamp,
        })

        res.status(200).json({
            status:"success",
            message:"successfully created"
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:err
        })
    }
}

exports.getTask=async(req,res)=>{
    try{    
        const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({
                status:"fail",
                message:"unauthorized access",
            })
        }

        const data=await Task.find({userId:decoded.id});

        res.status(200).json({
            status:"success",
            data
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:err
        })
    }
}

exports.deleteTask=async(req,res)=>{
    try{
        await Task.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({
            status:"success",
            message:"successfully deleted"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:err
        })
    }
}

exports.getoneTask=async(req,res)=>{
    try{
        const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({
                status:"fail",
                message:"unauthorized access",
            })
        }

        const data=await Task.findById({_id:req.params.id});
        
        res.status(200).json({
            status:"success",
            data,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:err
        })
    }
}

exports.updateTask=async(req,res)=>{
    try{
        const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({
                status:"fail",
                message:"unauthorized access",
            })
        }

        const timestamp=Date.now();

        await Task.findByIdAndUpdate({_id:req.params.id},{task:req.body.task,time:timestamp});

        res.status(200).json({
            status:"success",
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:err
        })
    }
}