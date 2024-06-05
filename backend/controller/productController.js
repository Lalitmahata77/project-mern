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

//create / upadte reviews -->/api/v1/reviews

export const createProductReview = catchAsycnError(async(req, res)=>{
    const {rating, comment, productId} = req.body;
    const review = {
        user : req?.user?._id,
        rating : Number(rating),
        comment
    }
   
    let product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("product not found"))
    }
  const isReviewed = product?.reviews?.find(
    (r)=> r.user.toString() === req?.user?._id.toString()
  )
  if (isReviewed) {
   product.reviews.forEach((review)=>{
    if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment,
        review.rating = rating
    }
   })
  }else{
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }
  product.ratings = product.reviews.reduce((acc, item)=>item.rating + acc, 0) /
  product.reviews.length;
  await product.save({validateBeforeSave : false})
    res.status(200).json({
        success : true
    })
})
//get reviews
export const getProductReview = catchAsycnError(async(req,res, next)=>{
    const product = await Product.findById(req.query.id)
    if (!product) {
        return next(new ErrorHandler("product not found"))
    }
    res.status(200).json({reviews : product.reviews})
})

//delete product reviews
export const deleteReview = catchAsycnError(async(req, res, next)=>{
    let product = await Product.findById(req.query.productId)
    if (!product) {
        return next(new ErrorHandler("product not found"))
    }
      const reviews = product?.reviews?.filter(
        (review)=>review._id.toString() !== req?.query?.id.toString()
    )
     const numOfReviews =product.reviews.length;
    const ratings =numOfReviews === 0 ? 0 : product.reviews.reduce((acc, item)=>item.rating+acc,0 )/numOfReviews
    product = await Product.findByIdAndUpdate(req.query.productId, {reviews, numOfReviews, ratings}, {new : true})
    await product.save({validateBeforeSave : false})

    res.status(200).json({success : true,
        product
    })

})