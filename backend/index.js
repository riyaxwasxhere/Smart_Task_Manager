import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js'
import taskRouter from './routes/taskRoutes.js'
import authMiddleware from './middlewares/authMiddleware.js'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/tasks', authMiddleware, taskRouter);


app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port: ${port}`)
})