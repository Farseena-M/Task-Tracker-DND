import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '.env') })

const connectDb = async () : Promise <void> => {
    try {
        await mongoose.connect(process.env.CONN_URL as string)
        console.log('DB connected');
    } catch (err) {
        console.log(err);
    }
}


export default connectDb