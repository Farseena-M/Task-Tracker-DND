import app from './app';
import { connectDb } from './dbConnect/dbConnect';
import dotenv from 'dotenv';
dotenv.config();

connectDb()

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to ${port}`);
})