import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
shippingInfo : {
    address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    phoneNo : {
        type : String,
        required : true
    },
    zipCode : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    }
},
user : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : "User"
},
orderItem :[
    {
        name : {
            type : String,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        },
        image : {
            type : String,
            required : true
        },
        price : {
            type : String,
            required : true
        },
        product : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : "Product"
        }
    }
],
paymentMethod : {
    type : String,
    required : [true, "Please select payment method"],
    enum :{
    values : ["COD", "Card"],
    message : "please select : cod or card"
    }
},
paymentInfo : {
    id : String,
    status : String
},
itemsPrice : {
    type : String,
    required : true
},
taxAmount : {
    type : Number,
    required : true
},
shippingAmount : {
    type : Number,
    required : true
},
totalAmount : {
    type : Number,
    required : true
},
orderStatus : {
    type : String,
    enum : {
        values : ["Procesing", "Shipped", "Delivered"],
        message : "please select order status"
    },
    default : "Procesing"
},
deliverdAt : Date

}, {timestamps : true})

const Order = mongoose.model("Order", orderSchema)
export default Order