import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "please enter product name"],
        maxLength : [200, "Product name can not exceed 200 characters"]
    },
    price : {
        type : String,
        required : [true, "please enter product price"],
        // maxLength : [5, "Product price can not exceed 5 digits"]
    },
    description : {
        type : String,
        required : [true, "please enter product description"],
    },
    ratings : {
        type : Number,
        default : 0
    },
    images : [{
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    }],
    category : {
        type : String,
        required : [true, "Please enter product category"],
        enum : {
            values : [
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Sports",
                "Outdoor",
                "Home",
            ],
            message : "Please select correct category"
        }
    },
    seller : {
        type : String,
        required : [true, "Please enter product seller"]
    },
    stock : {
        type : String,
        required : [true, "Please enter product stock"]
    },
    numOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
            },
            rating : {
                type : Number,
                required : true
            },
            comments : {
                type : String,
                required : true
            }
        }
    ],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required :true
    }

},{timestamps : true})

const Product = mongoose.model("Product", productSchema)
export default Product