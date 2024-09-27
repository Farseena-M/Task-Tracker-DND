import { Request, Response } from "express";
import { Todo } from "../model/todoModel";


export const createTodo = async (req: Request, res: Response) => {
    const { title } = req.body;
    const newTodo = new Todo({
        title
    })
    try {
        await newTodo.save()
        res.status(201).json({
            message: 'Success',
            data: {
                newTodo
            }
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error Creating Todo'
        })
    }
}




export const getTodo = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find()
        res.status(201).json({
            message: 'Success',
            data: {
                todos
            }
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching Todo'
        })
    }
}


export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true })
        res.status(201).json({
            message: 'Success',
            data: {
                updated
            }
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error updating Todo'
        })
    }
}




export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params    
    try {
        const deleted = await Todo.findByIdAndDelete(id)
        res.status(201).json({
            message: 'deleted',
            data: {
                deleted
            }
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting Todo'
        })
    }
}






