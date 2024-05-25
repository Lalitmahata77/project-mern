import User from "../models/userModel.js";
import catchAsycnError from "../middleware/catchAsycnError.js";
import errorHandler from "../utils/errorHandler.js"
import sendToken from "../utils/sendToken.js";
export const register = catchAsycnError(async(req,res)=>{
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return  res.status(200).json({message : "User already exist"})
    }
    if (password.length < 6) {
      return  res.status(400).json({message : "Password must be at least 6 character"})
    }

    const user = new User({
        name,
        email,
        password
    })
    if (user) {
    const token =  sendToken(user, 201, res)
        user.save()
        res.status(200).json({
           _id : user._id,
           name : user.name,
           email : user.email,
           password :user.password,
           avatar : user.avatar,
           role : user.role,
           resetPasswordToken : user.resetPasswordToken,
           resetPasswordExpire : user.resetPasswordExpire,
           token
        })
    }else{
        res.status(400).json({ error: "Invalid user data" });
    }


})

export const login = catchAsycnError(async(req, res, next)=>{
  const {email, password} = req.body;
  if (!email || !password) {
    return next(new errorHandler("please enter email && password", 400))
  }
  const user = await User.findOne({email}).select("+password")
  if (!user) {
    return next(new errorHandler("Invalid email or password", 401))
  }
  //isPasswordCorrect
  const isPasswordMatch = await user.isPasswordCorrect(password)
  if (!isPasswordMatch) {
    return next(new errorHandler("Invalid email or password", 401))
  }
  sendToken(user, 201, res)
})