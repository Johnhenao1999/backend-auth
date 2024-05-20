import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js'
import { getSalchi, createSalchi } from '../controllers/management.controller.js'

const router = Router()

router.get('/salchipapas-list', getSalchi)
/* router.get('/salchipapas-all', getTasksAll)
router.get('/salchipapas/:id', authRequired, getTask) */
router.post('/salchipapas-add', createSalchi)
/* router.delete('/salchipapas/:id', authRequired, deleteTask)
router.put('/salchipapas/:id', authRequired, updateTask) */

export default router;

