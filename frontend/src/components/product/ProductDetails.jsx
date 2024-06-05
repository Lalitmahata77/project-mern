import { useParams } from "react-router-dom"
import { useGetProductsDetailsQuery } from "../../redux/api/productApi"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loader from "../layout/Loader"
import StarRatings from "react-star-ratings"


const ProductDetails = () => {
const params = useParams()
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
  if(isLoading) return <Loader/>
  return (
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
              <button type="button" className="bg-gray-100 w-10 h-9 font-semibold flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current inline" viewBox="0 0 124 124">
                  <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                </svg>
              </button>
              <button type="button" className="bg-transparent w-10 h-9 font-semibold flex items-center justify-center text-gray-800 text-lg">
               1
              </button>
              <button type="button" className="bg-gray-800 text-white w-10 h-9 font-semibold flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current inline" viewBox="0 0 42 42">
                  <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                </svg>
              </button>
             
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
            <button type="button" className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Add to cart</button>
          </div>
          
          
      </div>
    </div>

          {/* <div className="flex flex-wrap gap-4 mt-8">
            <button type="button" className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded">Buy now</button>
            <button type="button" className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Add to cart</button>
          </div> */}

        </div>
        </div>

     
     /* <div>
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800">Product Description</h3>
          <p className="text-sm text-gray-800 mt-4">Enhance your daily routine with our advanced smartwatch. Featuring fitness tracking capabilities, heart rate monitoring, sleep tracking, and a waterproof design, this smartwatch is designed to keep up with your active lifestyle. Receive notifications and stay connected with its touchscreen interface, offering convenience at your fingertips. Upgrade to a smarter way of living with this essential accessory.</p>
        </div>
      </div>
    </div> */
  )
}

export default ProductDetails