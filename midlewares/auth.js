import jwt from "jsonwebtoken"
import User from "../models/user.js"
export const protect=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(!token) return res.status(404).json({message:'no token proviede'})
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.user=await User.findById(decode.id).select('-password')
    next()
    } catch (error) {
        res.status(401).json({message:'innvalid or expride'})
    }
}