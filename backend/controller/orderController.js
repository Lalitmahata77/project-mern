import catchAsycnError from "../middleware/catchAsycnError.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

//create new order -->/api/v1/order/new

export const newOrder = catchAsycnError(async(req,res,next)=>{
    const {shippingInfo,
         orderItem,
          paymentMethod,
          paymentInfo,
          itemsPrice,
            taxAmount, 
            shippingAmount, 
            totalAmount, 
            orderStatus} = req.body;
            const order = await Order.create({
                shippingInfo,
         orderItem,
          paymentMethod,
          paymentInfo,
          itemsPrice,
            taxAmount, 
            shippingAmount, 
            totalAmount, 
            orderStatus,
            user : req.user._id
            })
            res.status(200).json({order})
})

//order details

export const orderDetails =catchAsycnError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if (!order) {
        return next(new ErrorHandler("order not found with this id", 404))
    }
    res.status(200).json({order})
})

//myorders
export const myorders=catchAsycnError(async(req,res,next)=>{
    const order = await Order.find({user : req.user._id})
    res.status(200).json({order})
})
//get all orders
export const getAllOrder = catchAsycnError(async(req, res, next)=>{
    const order = await Order.find()
    res.status(200).json({order})
})

//update order
export const updateOrder = catchAsycnError(async(req, res, next)=>{
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("order not found with that id", 404))
    }
    if (order?.orderStatus === "Delivered") {
        return next(new ErrorHandler("you have already delivered order", 400))
    }
    order?.orderItem?.forEach(async(item)=>{
        const product = await Product.findById(item?.product?.toString())
        if (!product) {
            return next(new ErrorHandler("product not found with that id", 404))
        }
        product.stock = product.stock - item.quantity
        await product.save({validateBeforeSave : false})
    })
    order.orderStatus = req.body.status
    order.deliverdAt = Date.now()
    await order.save()
    res.status(200).json({
        success : true
    })
})

//delete order

export const deleteOrder =catchAsycnError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("order not found with this id", 404))
    }
    await order.deleteOne()
    res.status(200).json({success : true})
})