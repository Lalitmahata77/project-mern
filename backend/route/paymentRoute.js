import express from "express"
import { isAuthenticated } from "../middleware/authMiddleware.js"
import { stripeCheckoutSession, stripeWebHook } from "../controller/paymentController.js"
const router = express.Router()

router.route("/payment/checkout_session").post(isAuthenticated, stripeCheckoutSession)

router.route("/payment/webhook").post(stripeWebHook)
export default router