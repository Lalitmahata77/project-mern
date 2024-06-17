import { Link, useParams } from "react-router-dom"
import { useGetProductsDetailsQuery } from "../../redux/api/productApi"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loader from "../layout/Loader"
import StarRatings from "react-star-ratings"
import { useDispatch, useSelector } from "react-redux"
import { setCartItems } from "../../redux/features/cartSlice"
import NewReviews from "../reviews/NewReviews"
import ListReview from "../reviews/ListReview"


const ProductDetails = () => {
  const {isAthenticated} = useSelector((state)=> state.auth)
  const [quantity, setQuantity] = useState(1)
const params = useParams()
const dispatch = useDispatch()
   const {data, error, isError,isLoading} = useGetProductsDetailsQuery(params?.id)
   const product = data?.product
   const [activeImg, setActiveImg] = useState(" ")
  
   useEffect(()=>{
setActiveImg(product?.images[0] ? product?.images[0]?.url : "/images/default_product.png")
   },[product])
useEffect(()=>{
  if(isError){
  toast.error(error?.data?.message)
  }
  },[isError])
 
  const increageQnt =()=>{
    const count = document.querySelector(".count")
    if(count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1
    setQuantity(qty)
  }
  const decreaseQnt =()=>{
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  }
  const setItemToCart = () =>{
    const cartItem ={
      product : product?._id,
      name : product?.name,
      price : product?.price,
      images : product?.images[0]?.url,
      stock : product?.stock,
      quantity
    }
  dispatch(setCartItems(cartItem))
  toast.success("Item added to cart")
  }
  if(isLoading) return <Loader/>

  return (
    <>
    <div className="  font-sans tracking-wide max-md:mx-auto">
      <div className="bg-gradient-to-r   md:min-h-[600px] grid items-start grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-8">

        <div className="lg:col-span-3 h-full">
          <div className="p-4 relative h-full flex items-center justify-center">
            <img src={activeImg} alt="Product" className="lg:w-[48%] w-full h-full rounded-xl object-contain " />
</div>
          <div className=" mt-6 flex flex-wrap justify-center gap-6">
            {product?.images?.map((img, index)=>(
              <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]" key={index}>
            <a role="button">
                <img src={img?.url} alt={img?.url} className="w-24 cursor-pointer" onClick={(e)=>setActiveImg(img?.url)}/>
                </a>
              </div>
            
            ))}
              
            </div>
          </div>
     
       
        <div className="lg:col-span-2  py-6 px-8 h-full">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{product?.name}</h2>

            <div className="flex space-x-2 mt-2 gap-3">
            <StarRatings
          rating={product?.rating}
          starRatedColor="#ffb829"
          numberOfStars={5}
          name='rating'
          starDimension='17px'
          starSpacing='1px'
        />
             ({product?.numOfReviews} Reviews)
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Price</h3>
            <p className="text-gray-800 text-3xl font-bold">{product?.price}</p>
          </div>


 <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">Quantity</h3>
             <div className="flex divide-x border w-max mt-4 rounded overflow-hidden">
            
             
             <span className="btn bg-red-600 minus  " onClick={decreaseQnt}>
              -
            </span>
            <input
              type="number"
              className="form-control count d-inline"
              value={quantity}
              readOnly
            />
            <span className="btn btn-primary plus " onClick={increageQnt}>
              +
            </span>
         
            </div>  

         
        
           <div className=" mt-7 font-bold">
            Status : {" "}
            <span className={product?.stock > 0 ? " text-green-400  rounded" : "text-red-400 rounded"}>{product?.stock > 0 ? "In Stock" : "Out of Stock"}</span>
           </div>
          </div>
          <div>
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800">Product Description</h3>
          <p className="text-sm text-gray-800 mt-4">{product.description}</p>
        </div>
        <div className=" mt-6 font-bold text-xl">
            Sold by : {product.seller}
          </div>

        <div className="flex flex-wrap gap-4 mt-8">
            <button type="button" className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded">Buy now</button>
            <button type="button" className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded" disabled={product.stock <= 0} onClick={setItemToCart}>Add to cart</button>
          </div>
        
      
          
      </div>
      <div  > <NewReviews/></div>
     
       
    </div>

        </div>
       
        </div>
     
{
  product?.reviews?.length > 0 && <ListReview reviews={product?.reviews}/>
}
        </>
   
  )
}

export default ProductDetails