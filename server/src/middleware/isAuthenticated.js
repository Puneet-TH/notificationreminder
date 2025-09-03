import jwt from 'jsonwebtoken'
import { apiError } from '../utils/apiError.js'
import { apiResponse } from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asynchandler.js'
import { User } from '../models/users.model.js'

const verifyJWT = asyncHandler(async(req, res, next) => {
      try{const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")
      if(!token){
          throw new apiError(500, "unable to verify user or unauthorized request")
      }

      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
      if(!user){
        throw new apiError(500, "user's token is wrong or user not exist")
      }
      req.user = user;
      next()
   } 
   catch (error) {
         throw new apiError(401, error?.message || "Invalid acess token")
   }
})

export {verifyJWT}