import Task from "../models/taskModel.js";

//create a new task
export const createTaskService = async (data, userId) => {
    const task = await Task.create({ ...data, user: userId });
    if(!task){
        throw new Error('Task creation failed');
    }
    return task;
}

//get all tasks
export const getTasksService = async (userId) =>{
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
    if(!tasks){
        throw new Error('No tasks found');
    }
    return tasks;
}

//update a task
export const updateTaskService = async (taskId, data, userId) => {
    const task = await Task.findOneAndUpdate(
        { _id: taskId, user: userId },
        data,
        { new: true }
    )

    if(!task){
        throw new Error('Task not found');
    }

    return task;
}

//delete a task
export const deleteTaskService = async (taskId, userId) => {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if(!task){
        throw new Error('Task not found');
    }
}