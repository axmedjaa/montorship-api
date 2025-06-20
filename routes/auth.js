import express from 'express'
import { login, register } from '../controllers/auth.js'
import { protect } from '../midlewares/auth.js'
import { validate } from '../midlewares/validatezod.js'
import { userSchema } from '../schemes/userScheme.js'
const router=express.Router()
// realcearte
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */
router.post('/register',validate(userSchema), register)
router.post('/login',login)
// protected
router.get('/profile',protect,(req,res)=>{
    console.log(req.user)
    res.json('protect')
})
export default router