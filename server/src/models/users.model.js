import mongoose, {Schema} from "mongoose";
import jwt from  "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({ 
     fullName : {
        type : String,
        required : true
     },
     email : {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
     },
     password : {
        type : String,
        required : true
     },
     exams : [
        {
          type : mongoose.Types.ObjectId,
          ref : "Exam"
        }
     ],
    refreshToken: {
         type: String  
   }
}, {timestamps: true}) 

userSchema.pre("save", async function(next) {
         if(!this.isModified("password")) return next()
    
         this.password = await bcrypt.hash(this.password, 10)
         next()
}) 

userSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password, this.password)
}
//for validation
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
 
userSchema.methods.generateRefreshToken = function(){
 return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
//generate the acess token using refresh which is in db
// jwt.sign({
//   data: 'foobar'
// }, 'secret', { expiresIn: 60 * 60 });


export const User = mongoose.model("User", userSchema)

