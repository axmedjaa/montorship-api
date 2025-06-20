import User from "../models/user.js"
import cloudinary from "../utils/cloudinary .js"
export const uplodeFile=(req,res,next)=>{
    if(!req.file){
        return res.status(404).json({message:'no file uploded'})
    }
    const stream=cloudinary.uploader.upload_stream(
        {folder:'dugsiye_uploads',resource_type:'auto'},
        async(error,result)=>{
            if(error) return next(error)
              await User.findByIdAndUpdate(req.user._id,{profile:result.secure_url})
             return res.status(201).json({
            success:true,fileUrl:result.secure_url})   
        }
    )
    stream.end(req.file.buffer)
}