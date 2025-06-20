import { object, success } from "zod/v4"

export const validate=(schema)=>(req,res,next)=>{
    const result=schema.safeParse(req.body)
    if(!result.success){
        const formatted=result.error.format()
        res.status(404).json({
            success:false,message:'valitaion vailed',
            errors:Object.keys(formatted).map(field=>({
                field,
                message:formatted[field]?._errors?.[0] || 'invalid input'
            }))
        })
    }
    next()
}