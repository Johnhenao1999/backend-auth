import  {Router} from 'express'
import {login, register, logout, profile, verifyToken} from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validaSchema } from '../middlewares/validator.middeleware.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'

const router = Router()


router.post('/register', validaSchema(registerSchema), register)
router.post('/login', validaSchema(loginSchema) , login)
router.post('/logout' , logout)
router.get('/profile' , authRequired, profile)
router.get('/verify' , verifyToken)

export default router;  