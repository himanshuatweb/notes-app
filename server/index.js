import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();

import taskRouter from './routes/task.js';
import userRouter from './routes/user.js';

import {connectDB} from './db.js';

connectDB();

app.use(cors());
app.use(bodyParser.json({ limit:'10mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use('/api/task',taskRouter);
app.use('/api/user',userRouter);

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

/*
MongoDB Credentials
Email : gisivem917@pamaweb.com
Password : Himanshu@123
*/

/*
1. Add model for user
2. Creates routes for user - register user, login user and logout user
3. Create controller for user

1. update taskModel according to user model
    - add userid to each task when it is created.


*/