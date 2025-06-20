import mongoose from "mongoose";
import { string } from "zod/v4";
import { required } from "zod/v4-mini";
const TaskScheema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    description: String,
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending'
    }, 
    dueDate: Date,
     createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
},{timestamps:true}
)
export default mongoose.model('Task',TaskScheema)