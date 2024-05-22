import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js'
import { getTasks, getTask,createTask,updateTask,deleteTask} from '../controllers/task.controller.js'

const router = Router()

router.get('/salchipapas', authRequired, getTasks)
router.get('/salchipapas/:id', authRequired, getTask)
router.post('/salchipapas', authRequired, createTask)
router.delete('/salchipapas/:id', authRequired, deleteTask)
router.put('/salchipapas/:id', authRequired, updateTask)

export default router;

