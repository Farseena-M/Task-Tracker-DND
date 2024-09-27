import express from 'express'
import todoRouter from './src/router/todoRouter'
import cors from 'cors';
const app = express()
app.use(express.json())
app.use(cors())


app.use('/todo',todoRouter)


export default app