import { User } from "../models/users.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import mongoose from "mongoose"
import jwt from "jsonwebtoken"

// {name} = named export
// name (no braces) = default export

const generateAccessAndRefreshToken = async(userId) => {
    try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()
      
      //since db is an object so adding data in object using . simple
      user.refreshToken = refreshToken
      await user.save({validateBeforeSave: false})//checks for if teh required fields are there or not if enabled false bypass these check bydefault

      return {accessToken, refreshToken}

    } catch (error) {
       throw new apiError(500, "Something went wrong while generating token")
    }
}

const signup = asyncHandler(async(req, res) => {
    const {fullName, email, password} = req.body  
    if(!email || !fullName || !password) {
        throw new apiError(400, "Enter details don't leave empty")
    }
    try {
            const user = await User.findOne({email : email})
            if(user){
                return res
                    .status(200)
                    .json(new apiResponse(200, user, "User is already registered"))
            }
        
            const newUser = await User.create({
                fullName : fullName,
                email : email,
                password : password
            })
        
            if(!newUser) {
                throw new apiError(404, "problem in creating new user")
            }
        
            return res
                .status(200)
                .json(new apiResponse(200, newUser, "user created successfully"))
    } catch (error) {
        throw new apiError(500, "problem in fetching from db")
    }
})

const login = asyncHandler(async(req, res) => {
    try {
        const{email, password} = req.body
        if(!email || !password) {
            throw new apiError(400, "enter email and password dont leave empty")
        }
         const user = await  User.findOne({
           email : email
         })
          
        if(!user){
         throw new apiError(404, "user doesnt exist register first")
         }
        
          const isPasswordValid = await user.isPasswordCorrect(password)

        if(!isPasswordValid) {
            throw new apiError(401, "user is not authorized")
         }
         
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
         const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

      const options = {
      httOnly : true,
      secure: true
     }
     return  res
     .status(200)
     .cookie("accessToken", accessToken, options)
     .cookie("refreshToken", refreshToken, options)
     .json(
      new apiResponse(
         200,
         {
            user : loggedInUser, accessToken, refreshToken
         },
         "user logged in success"
      )
     )
        
    } catch (error) {
         return res.status(500).json(new apiError(500, `Internal server error and ${error}`));
    }
})

const logout = asyncHandler(async(req, res) => {
    const{userId} = req.user._id
    if(!userId) {
          throw new apiError(501, "error in loggingout")
    }

    const Logout = await User.findByIdAndUpdate(userId, {
        $unset : {
            refreshToken: 1
        }

    }, {new : true})

    const options = {
        httpOnly: true,
        secure : true,
    }

    return res
           .status(200)
           .clearCookie("accessToken", options)
           .clearCookie("refreshToken", options)
           .json(new apiResponse(200, Logout, "user logged out successfully"))
})


export {
    signup,
    login,
    logout
}
