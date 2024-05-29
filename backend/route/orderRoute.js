import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware.js"
import { deleteOrder, getAllOrder, myorders, newOrder, orderDetails, updateOrder } from "../controller/orderController.js"
const router = express.Router()

router.route("/order/new").post(isAuthenticated, newOrder)
router.route("/order/:id").get(isAuthenticated,orderDetails)
router.route("/me/order").get(isAuthenticated,myorders)
router.route("/admin/orders").get(isAuthenticated,authorizeRoles("admin"), getAllOrder)
router.route("/admin/orders/:id")
.put(isAuthenticated,authorizeRoles("admin"), updateOrder)
.delete(isAuthenticated,authorizeRoles("admin"),deleteOrder)
export default router