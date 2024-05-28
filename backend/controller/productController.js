import Product from "../models/productModel.js"
import ErrorHandler from "../utils/errorHandler.js";
import catchAsycnError from "../middleware/catchAsycnError.js";
import APIFilter from "../utils/apiFilters.js";
export const getProduct = async(req,res)=>{
    const resPerPage = 4;
    const apiFilters = new APIFilter(Product, req.query).search().filters()
    apiFilters.pagination(resPerPage);
    let products = await apiFilters.query;
    const filtersProductCount = Product.length
    console.log(req.user);
    products = await apiFilters.query.clone();

res.status(200).json({
    resPerPage,
    filtersProductCount,
    products
})
}

//create new product --> /api/v1/admin/products
export const newProduct =catchAsycnError(async(req,res)=>{
    req.body.user = req.user._id
    const product = await Product.create(req.body)
    res.status(200).json({
        product
    })
})

//getProduct details --> /api/v1/products/:id
export const getProductDetails = catchAsycnError(async(req, res, next)=>{
    const {id} = req?.params;
    const product = await Product.findById(id);
    if (!product) {
      return next(new ErrorHandler("product not found"))
    }
    res.status(200).json({product})
})

//update product
export const updateProduct = catchAsycnError(async(req, res)=>{
    const {id} = req.params;
    let product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler("product not found"))
    }
    product = await Product.findByIdAndUpdate(id, req.body, {new : true});
    res.status(200).json({
        product
    })
})

//delete product
export const deleteProduct = catchAsycnError(async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler("product not found"))
    }
    await product.deleteOne();
    res.status(200).json({message : "Product deleted successfully"})
})
