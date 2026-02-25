import { createTaskService, getTasksService, updateTaskService, deleteTaskService } from '../services/taskService.js';

export const createTask = async (req,res) => {
    try{
        const task = await createTaskService(req.body, req.userId);
        return res.status(201).json(task);
    } catch(error){
        return res.status(400).json({ error: error.message });
    }
}

export const getTasks = async (req,res) => {
    try{
        const {status, search } = req.query;
        let query = { userId: req.userId };
        if(status) query.status = status;
        if(search) query.title = { $regex: search, $options: 'i' };
        
        const tasks = await getTasksService(req.userId);
        return res.status(200).json(tasks);
    } catch(error){
        return res.status(400).json({ error: error.message });
    }
}

export const updateTask = async (req,res) =>{
    try{
        const task = await updateTaskService(req.params.id, req.body, req.userId);
        return res.status(200).json(task);
    } catch(error){
        return res.status(400).json({ error: error.message });
    }
}

export const deleteTask = async (req,res) => {
    try{
        await deleteTaskService(req.params.id, req.userId);
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch(error){
        return res.status(400).json({ error: error.message });
    }
}