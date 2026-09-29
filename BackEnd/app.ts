import express from 'express'
import todoRouter from './src/router/todoRouter'
import cors from 'cors';
const app = express()
app.use(express.json())
app.use(cors({
    origin: "https://task-tracker-one-taupe.vercel.app"
}))

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.use('/todo', todoRouter)


export default app