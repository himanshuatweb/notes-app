import express from 'express';

const router = express.Router();

import {readTask, createTask ,updateTask ,deleteTask } from '../controllers/taskController.js'

import auth from '../middleware/auth.js';

router.get('/', auth, readTask);

router.post('/',auth, createTask);

router.put('/:_id', auth, updateTask);

router.delete('/:id', auth, deleteTask)


export default router;