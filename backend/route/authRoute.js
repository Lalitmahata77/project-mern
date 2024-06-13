import express from "express"
import { deleteUser, forgotPassword, getAllUsers, getUserDetails, getUserProfile, login, logout, register, resetPassword, updatePassword, updateProfile, updateUser, uploadAvatar } from "../controller/authController.js"
import {authorizeRoles, isAuthenticated} from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticated,getUserProfile)
router.route("/me/update").put(isAuthenticated,updateProfile)
router.route("/me/upload_avatar").put(isAuthenticated, uploadAvatar)
router.route("/password/update").put(isAuthenticated,updatePassword)
router.route("/admin/users").get(isAuthenticated, authorizeRoles("admin"), getAllUsers)
router.route("/admin/user/:id")
.get(isAuthenticated,authorizeRoles("admin"),getUserDetails)
.put(isAuthenticated,authorizeRoles("admin"), updateUser)
.delete(isAuthenticated,authorizeRoles("admin"), deleteUser)
export default router