import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    dataName:{
        type:String,
        required:[true,'Task Name is Required']
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    fileName:{
        type:String,
    },
    createdAt:{
        type:Date,
        default: new Date(),
    }
})

const TaskModel = mongoose.model('TaskModel',taskSchema);

export default TaskModel;