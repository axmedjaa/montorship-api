import { json }  from 'express'
import User from '../models/user.js'
import { generateToken } from '../utils/generetor.js'
export const getUsers=async(req,res)=>{
  const users=await User.find()
    res.json(users)
}
export const getUserInfo=async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(!user) return res.status(404).send('user not found')
    res.json(user)
}
export const createUser=async(req,res)=>{
  const user=new User(req.body)
  const saved=await user.save()
  res.status(201).json(saved)
}
export const updateUser=async(req,res)=>{
  const{id}=req.params
  try {
    const updatedUser=await User.findByIdAndUpdate(id,req.body,{new:true})
    if(!updatedUser) return res.status(404).send('user not found')
      res.json(updatedUser)
  } catch (error) {
    res.status(500).send('server error')
  }
}
export const deleteUser=async (req,res)=>{
  const{id}=req.params
 try {
   const deleteUser= await User.findByIdAndDelete(id)
  if(!deleteUser) return res.status(404).send('user not found')
    res.send('user is deleted')
 } catch (error) {
      res.status(500).send('server error')
 }
}
