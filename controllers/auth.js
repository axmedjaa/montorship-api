import { json }  from 'express'
import User from '../models/user.js'
import { generateToken } from '../utils/generetor.js'

// regester user
export const register=async(req,res,next)=>{
  let{name,email,password,role}=req.body
  try {
    email=email.toLowerCase()
    const exists=await User.findOne({email})
    if(exists) return res.status(404).json({message:'eamil is already used '})
    const user=await User.create({name,password,email,role})
  const token=generateToken(user._id)
  res.status(201).json(token)
  } catch (error) {
    next(error)
  }
}
// login
export const login=async(req,res,next)=>{
    let {email,password}=req.body
    try {
        email=email.toLowerCase()
        const user=await User.findOne({email})
        if(!user || !(await user.comparePassword(password))) return res.status(404).json({message:'invalid email or password'})
         const token=generateToken(user._id)
        res.json(token)   
    } catch (error) {
        next(error)
    }
}