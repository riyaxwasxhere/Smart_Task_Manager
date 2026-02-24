import express from 'express'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js';

const taskRouter = express.Router()

taskRouter.post('/create-task', createTask)
taskRouter.get('/get-all-tasks', getTasks)
taskRouter.put('/update-task/:id', updateTask)
taskRouter.delete('/delete-task/:id', deleteTask)

export default taskRouter;