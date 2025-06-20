export const authorize=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            res.status(404).json({message:`requires on of[${roles.join(',')}]`})
        }
        next()
    }
}