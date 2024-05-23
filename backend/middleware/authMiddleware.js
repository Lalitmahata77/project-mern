import catchAsycnError from "./catchAsycnError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
const isAuthenticated = catchAsycnError(async(req,res,next)=>{
    const token = req.cookies.jwt;
    console.log(token);
    if (!token) {
        return next(new ErrorHandler("invalid token", 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded);
    req.user = await User.findById(decoded.id)
    next()
})
export default isAuthenticated