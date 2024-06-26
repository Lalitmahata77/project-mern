import catchAsycnError from "./catchAsycnError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
 export const isAuthenticated = catchAsycnError(async(req,res,next)=>{
    const {token} = req.cookies;
    //  console.log(token);
    if (!token) {
        return next(new ErrorHandler("invalid token", 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
})

//authorizeRole

export const authorizeRoles = (...roles)=>{
    return (req, res, next)=>{
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role(${req.user.role}) is not allow to acess this resource`)
            )
        }
        next()
    }
}