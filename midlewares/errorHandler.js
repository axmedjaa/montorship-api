export const errorHandler=(err,req,res,next)=>{
    const status=err.statusCode||500
    res.status(status).json({
        success:false,
        message:err.message|| "something went wrong",
        status
    })
}