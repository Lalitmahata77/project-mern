import { useEffect } from "react"
import { useGetProductsQuery } from "../redux/api/productApi"
import Loader from "./layout/Loader"
import MetaData from "./layout/MetaData"
import ProductItem from "./product/ProductItem"
import toast from "react-hot-toast"
import CustomPagination from "./layout/CustomPagination"
import { useSearchParams } from "react-router-dom"
import Filters from "./layout/Filters"
const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || ""
  const min = searchParams.get("min")
  const max = searchParams.get("max")
  const category = searchParams.get("category")
  const ratings = searchParams.get("ratings")
  const params = {page, keyword}
  min !== null && (params.min = min)
  max !== null && (params.max = max)
  category !== null && (params.category = category)
  ratings !== null && (params.ratings = ratings)
const {data, isLoading, error, isError} =  useGetProductsQuery(params)

useEffect(()=>{
if(isError){
toast.error(error?.data?.message)
}
},[isError])
if(isLoading) return <Loader/>
const columnSize = keyword ? 4 : 3
return (
    < >
    <MetaData title={"Buy Best Product Online"}/>
    <div className="  grid grid-flow-col">
   <div className=" flex">
   {
     keyword && (
      <div className=" ml-8">
        <Filters/>
      </div>
     )
    }
   </div>
   <div className="">
    <h1 className=" font-bold text-4xl ml-80 mt-5 ">
      {keyword ? `${data?.products.length} products found with keyword : ${keyword}` : "Latest products"}
      </h1>
    
    <div className=" flex">
    {data?.products?.map((product, index)=>(
      <ProductItem product={product} columnSize={columnSize} key={index}/>
    ))}
   </div>
   </div>
   <CustomPagination resPerPage={data?.resPerPage} filtersProductCount={data?.filtersProductCount}  />
   </div>
 </>

  )
}

export default Home