import mongoose from "mongoose";
import becrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter your name"]

    },
    email : {
        type : String,
        required : [true, "please enter your email"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "please enter your password"],
        minLength : [6 , "password must be exist at least 6 character"],
        select : false
    },
    avatar : {
        public_id : String,
        url : String
    },
    role : {
        type : String,
        default : "user"
    },
    resetPasswordToken : String,
    resetPasswordExpire : String
}, {timestamps : true})

//Encrypting password before saving the password
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        next()
    }

    this.password = await becrypt.hash(this.password, 10)
})

//jwt token
userSchema.methods.getJwtToken = function(){
  return jwt.sign({id : this._id}, process.env.JWT_SECRET, {
    expiresIn : "15d"
    })
 
}

//isPasswordCorrect
userSchema.methods.isPasswordCorrect = function(enteredPassword){
   return  becrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)
export default User