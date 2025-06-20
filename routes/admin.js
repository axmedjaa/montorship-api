import express from 'express'
import { protect } from '../midlewares/auth.js'
const router=express.Router()
router.get("/admin",protect,(req,res)=>{
    res.json({message:'welcome admon'})
})
export default router