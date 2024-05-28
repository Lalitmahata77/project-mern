import User from "../models/userModel.js";
import catchAsycnError from "../middleware/catchAsycnError.js";
import crypto from "crypto"
import sendToken from "../utils/sendToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
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
    return next(new ErrorHandler("please enter email && password", 400))
  }
  const user = await User.findOne({email}).select("+password")
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401))
  }
  //isPasswordCorrect
  const isPasswordMatch = await user.isPasswordCorrect(password)
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password", 401))
  }
  sendToken(user, 201, res)
})

//logout
export const logout = catchAsycnError(async(req, res, next)=>{
  res.cookie("token", null, {
    expires : new Date(Date.now()),
    httpOnly : true
  })
  res.status(200).json({
    message : "Logged out"
  })
})

//forget password
export const forgotPassword = catchAsycnError(async(req, res, next)=>{
  const user = await User.findOne({email : req.body.email})
  if (!user) {
    return next(new ErrorHandler("User not found for this email", 404))
  }
  //get reset password
  const resetToken = await user.getResetPasswordToken()
  await user.save()
  //create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`

  const message = getResetPasswordTemplate(user?.name, resetUrl)
  try {
    await sendEmail({
      email : user.email,
      subject : "ShopIt password recovery",
      message,
    })
    res.status(200).json({message : `Email sent to : ${user.email}`})
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(error?.message, 500))
  }
  sendToken(user, 200, res)
})

export const resetPassword = catchAsycnError(async(req,res,next)=>{
 const resetPasswordToken = crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");


  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire : {$gt: Date.now()}
  })
  if (!user) {
    return next(new ErrorHandler("Password reset token is invalid or has been expire", 400))
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400))
  }
  //set new password
  user.password =req.body.password;
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  sendToken(user, 200, res)

})
//get user profile
export const getUserProfile =catchAsycnError( async(req, res, next) =>{
  const user = await User.findById(req?.user?._id).select("-resetPasswordToken -resetPasswordExpire")
  res.status(200).json({user})

})

//update password
export const updatePassword = catchAsycnError(async(req,res,next)=>{
const user = await User.findById(req?.user?._id).select("+password")
const isPasswordMatch = await user.isPasswordCorrect(req.body.oldPassword)
if (!isPasswordMatch) {
  return next(new ErrorHandler("old password is incorrect.", 400))
}
user.password = req.body.password
user.save()
res.status(200).json({
  success : true
})

})
//upadte userProfile --> api/v1/me/upadte
export const updateProfile = catchAsycnError(async(req,res,next)=>{
  const newUserData = {
    name : req.body.name,
    email : req.body.email
  }
  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {new : true})
  res.status(200).json({user})
})

//get all users -->/api/v1/admin/users
export const getAllUsers =catchAsycnError(async(req,res,next)=>{
  const users = await User.find()
  res.status(200).json({users})
})

//get user details-->admin
 export const getUserDetails = catchAsycnError(async(req,res,next)=>{
  const user = await User.findById(req.params.id)
  if (!user) {
    next(new ErrorHandler(`User not found with that id : ${req.params.id}`))
  }
  res.status(200).json({user})
 })

 //update user-->api/v1/admin/update/:id
 export const updateUser = catchAsycnError(async(req,res,next)=>{
  const newUserData = {
    name : req.body.name,
    email : req.body.email,
    role : req.body.role
  }
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {new : true})
  res.status(200).json(user)
 })
//delete user --> admin
 export const deleteUser = catchAsycnError(async(req,res,next)=>{
  const user = await User.findById(req.params.id)
  if (!user) {
    next(new ErrorHandler(`User not found with that id : ${req.params.id}`))
  }
await user.deleteOne()
  res.status(200).json({success : true})
 })