import express from 'express'
import userRoutes from './routes/users.js'
const app=express();
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose';
import helmet from 'helmet';
import { Loger } from './midlewares/loger.js';
import { notFound } from './midlewares/notFound.js';
import { errorHandler } from './midlewares/errorHandler.js';
import authRouter from './routes/auth.js'
import dashboard from './routes/admin.js'
import UplodeRouter from './routes/upload.js';
import taskRouter from './routes/task.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';
import { limiter } from './midlewares/rateLimiter.js';
app.use(Loger)
dotenv.config()
app.use(helmet())
app.use(express.json())
app.use(cors(
    {
        origin:[""]
    }
))
app.use(limiter)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const port=process.env.PORT
// coonect
mongoose.connect(process.env.NODE_ENV=="development"?process.env.MONGO_URI_DEV:process.env.MONGO_URI_PRO)
        .then(()=>console.log("hi"))
        .catch(()=>console.log("no"))
// midware
app.use('/users',userRoutes)
app.use('/auth',authRouter)
app.use('/dashboard',dashboard)
app.use('/uplode',UplodeRouter)
app.use('/tasks',taskRouter)
app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>{
    console.log("server is runing")
})