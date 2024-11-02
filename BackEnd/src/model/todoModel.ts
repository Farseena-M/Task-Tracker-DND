import mongoose from 'mongoose'
import { ITodo } from '../interface/Itodo'

const todoSchema = new mongoose.Schema<ITodo>({
    title: {
        type: String,
        required: true
    },
},
{timestamps:true})

export const Todo = mongoose.model<ITodo>('Todo', todoSchema)
