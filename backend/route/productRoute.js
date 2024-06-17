import express from "express"
import { canUserReview, createProductReview, deleteProduct, deleteReview, getProduct, getProductDetails, getProductReview, newProduct, updateProduct } from "../controller/productController.js"
import {authorizeRoles, isAuthenticated} from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/products").get(getProduct)
router.route("/admin/products").post(isAuthenticated,authorizeRoles("admin"),newProduct)
router.route("/products/:id").get(getProductDetails)
router.route("/admin/products/:id").put(isAuthenticated,authorizeRoles("admin"),updateProduct)
router.route("/admin/products/:id").delete(isAuthenticated,authorizeRoles("admin"),deleteProduct)
router.route("/reviews")
.get(isAuthenticated, getProductReview)
.put(isAuthenticated, createProductReview)
router.route("/admin/reviews").delete(isAuthenticated, authorizeRoles("admin"), deleteReview)
router.route("/can_review").get(isAuthenticated, canUserReview)
export default router