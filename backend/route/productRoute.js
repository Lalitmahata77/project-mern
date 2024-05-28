import express from "express"
import { deleteProduct, getProduct, getProductDetails, newProduct, updateProduct } from "../controller/productController.js"
import {authorizeRoles, isAuthenticated} from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/products").get(getProduct)
router.route("/admin/products").post(isAuthenticated,authorizeRoles("admin"),newProduct)
router.route("/products/:id").get(getProductDetails)
router.route("/admin/products/:id").put(isAuthenticated,authorizeRoles("admin"),updateProduct)
router.route("/admin/products/:id").delete(isAuthenticated,authorizeRoles("admin"),deleteProduct)
export default router