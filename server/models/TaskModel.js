const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    task:{
        type:String,
        required:true,
    },
    time:{
        type:Number,
        required:true,
    }
});

const Task=mongoose.model('Task',taskSchema);

module.exports=Task;