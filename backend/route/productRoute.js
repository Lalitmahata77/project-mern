import express from "express"
import { deleteProduct, getProduct, getProductDetails, newProduct, updateProduct } from "../controller/productController.js"
import isAuthenticated from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/products").get(isAuthenticated,getProduct)
router.route("/admin/products").post(newProduct)
router.route("/products/:id").get(getProductDetails)
router.route("/products/:id").put(updateProduct)
router.route("/products/:id").delete(deleteProduct)
export default router