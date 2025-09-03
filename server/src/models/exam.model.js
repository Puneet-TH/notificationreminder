import mongoose, { Schema } from "mongoose";
import { User } from "./users.model.js";

const examSchema = new Schema ({
    examName : {
        type : String,
        required : true 
    },
    owner : {
       type : mongoose.Types.ObjectId,
       ref : "User"
    }
})
export const Exam = mongoose.model("Exam", examSchema) 