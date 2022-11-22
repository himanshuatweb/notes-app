import TaskModel from "../model/taskModel.js";

// Route - GET All Task From Database;
const readTask = async (req,res)=>{
    console.log(req.userId);
    try {
       
        const tasks = await TaskModel.find({user:req.userId})
        let taskNotDeleted= [];

        for(let i=0 ; i< tasks.length;i++){
            if(tasks[i].isDeleted === false){
              
                taskNotDeleted.push(tasks[i])
                console.log(taskNotDeleted)
            }else{
                console.log("In True ",i);

            }
        }
        for(let i=0 ; i< taskNotDeleted.length;i++){
            console.log(taskNotDeleted[i].dataName, taskNotDeleted[i].isDeleted);    
        }

        console.log("In All Task Controller")
        // res.status(200).json({tasks});
        res.status(200).json(taskNotDeleted);
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong in reading Tasks',
            message: error.message,
          });
    }
    
}
// Route - Create New Task in Database;
const createTask = async(req,res)=>{
    const task= req.body;
    console.log(task.dataName);
    const newTask = new TaskModel({
        ...task,
        user:req.userId,
        createdAt: new Date().toISOString()
    })
    try {
        await newTask.save();
        console.log('POST CREATED SUCCESSFULLY');
        res.status(200).json(newTask)
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong in creating a Task',
            message: error.message,
          });
    }
}

const updateTask = async(req,res)=>{
    console.log('In task Controller - updateTask');
    const {_id} = req.params;
    const data = req.body;
    console.log(_id);
    try {
        //First find if particular task is in database or not.
        const task = await TaskModel.findById(_id);
        if(!task){
            res.status(404).json({
                msg: 'Task does not exits.',
                message: error.message,
              });
            return;
        }
        const updatedTask = await TaskModel.findByIdAndUpdate(_id,{
            ...data
        }, {new:true})

        console.log('TASK UPDATED');
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong in updating task.',
            message: error.message,
          });
    }
}

const deleteTask = async (req,res)=>{
    const _id = req.params.id;
    try {
        //First find if particular task is in database or not.
        const task = await TaskModel.findById(_id);
        if(!task){
            res.status(404).json({
                msg: 'Task does not exits.',
                message: error.message,
              });
            return;
        }
        console.log(task);
        const updatedIsDeleted = await TaskModel.findByIdAndUpdate(_id,{
            isDeleted:true,
        }, {new:true})
        console.log('Task delete Successfully');
        res.status(200).json(updatedIsDeleted);
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong in deleting task.',
            message: error.message,
          });
    }
}

export {readTask, createTask , updateTask , deleteTask };

