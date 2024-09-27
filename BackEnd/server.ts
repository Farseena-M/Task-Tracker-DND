import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import app from './app';
import connectDb from './dbConnect/dbConnect';


connectDb()

const port = 5000
app.listen(port, () => {
    console.log(`Listening to ${port}`);
})