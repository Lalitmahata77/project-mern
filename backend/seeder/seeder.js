import mongoose from "mongoose";
import Product from "../models/productModel.js";
import products from "./data.js"

const seedProduct = async()=>{
   try {
     await mongoose.connect("mongodb://127.0.0.1:27017/shopit")
 
 await Product.deleteMany();
 console.log("products are deleted");
 await Product.insertMany(products);
 console.log("products are added");
 
 process.exit()
   } catch (error) {
    console.log(error.message);
    process.exit()
   }
}
seedProduct()