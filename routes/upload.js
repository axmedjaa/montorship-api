import express from 'express'
import { protect } from '../midlewares/auth.js'
import { uplode } from '../midlewares/uplode.js'
import { uplodeFile } from '../controllers/uplodeController.js'
const router=express.Router()
router.post('/picture',protect,uplode.single('file'),uplodeFile)
export default router