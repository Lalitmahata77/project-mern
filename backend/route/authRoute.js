import express from "express"
import { forgotPassword, getUserProfile, login, logout, register, resetPassword, updatePassword } from "../controller/authController.js"
import {isAuthenticated} from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticated,getUserProfile)
router.route("/password/update").put(isAuthenticated,updatePassword)
export default router