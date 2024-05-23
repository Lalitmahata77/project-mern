import User from "../models/userModel.js";
import catchAsycnError from "../middleware/catchAsycnError.js";
import errorHandler from "../utils/errorHandler.js"
import sendToken from "../utils/sendToken.js";
export const register = catchAsycnError(async(req,res)=>{
    const {name, email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
      return  res.status(200).json({message : "User already exist"})
    }
    if (password.length < 6) {
      return  res.status(400).json({message : "Password must be at least 6 character"})
    }

    const newUser = new User({
        name,
        email,
        password
    })
    if (newUser) {
    const token =  sendToken(newUser, 201, res)
        newUser.save()
        res.status(200).json({
           _id : newUser._id,
           name : newUser.name,
           email : newUser.email,
           password : newUser.password,
           avatar : newUser.avatar,
           role : newUser.role,
           resetPasswordToken : newUser.resetPasswordToken,
           resetPasswordExpire : newUser.resetPasswordExpire,
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