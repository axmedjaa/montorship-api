import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { string } from 'zod/v4'
const userScheema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    profile:String
})
// hasspasswod befpre ssving
userScheema.pre('save',async function(next) {
    if(!this.isModified('password')) return next()
    const selt =await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,selt)
    next()
})
// method to compere password
userScheema.methods.comparePassword=function(inputPassword){
    return bcrypt.compare(inputPassword,this.password)
}
const User=mongoose.model('user',userScheema)
export default User