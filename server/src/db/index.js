import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

// const connectDB = async() =>{
//     try {
//       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       console.log(`\n MongoDb connected !! DB HOST: ${connectionInstance.connection.host}`);
//     } catch (error) {
//         console.log("MONGO_DB CONECTION FAILED: ", error);
//         process.exit(1)
//     }
// }

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`mongodb connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("unable to connect connection failed ", error);
        process.exit(1)//to exit the curent process immediately on failur
    }
}

export default connectDB