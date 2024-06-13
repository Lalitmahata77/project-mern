import express from "express"
import { isAuthenticated } from "../middleware/authMiddleware"
import { stripeCheckOutSession } from "../controller/paymentController"
const router = express.Router()

router.route("/payment/checkout_session").post(isAuthenticated, stripeCheckOutSession)



export default router