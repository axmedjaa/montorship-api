import {z} from 'zod'
export const userSchema=z.object({
    name:z.string().min(1,'name is required'),
    email:z.string().email('email required'),
    password:z.string().min(6,'must be atleast 6').max(100,'must be most 100')
})