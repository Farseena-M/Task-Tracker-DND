import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controller/controller";
const todoRouter = express.Router();


todoRouter.post('/create', createTodo)
todoRouter.get('/all', getTodo)
todoRouter.patch('/:id', updateTodo)
todoRouter.delete('/:id', deleteTodo)

export default todoRouter