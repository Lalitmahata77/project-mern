import { useEffect } from "react"
import { useMyOrderQuery } from "../../redux/api/orderApi"
import toast from "react-hot-toast"
import Loader from "../layout/Loader"
import {MDBDataTable} from "mdbreact"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import {clearCart} from "../../redux/features/cartSlice"
const MyOrder = () => {
    const {data, isLoading, error} = useMyOrderQuery()
    const [searchParams] = useSearchParams()
    const orderSuccess = searchParams.get("order_success")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        if (error) {
            toast.error(error?.data?.message)
        }
        if (orderSuccess) {
          dispatch(clearCart)
          navigate("/me/orders")
        }
    },[error, orderSuccess])
   const setOrder = ()=>{
    const orders = {
        columns : [
            {
              label : "ID",
              field : "id",
              sort : "asc"
            },
            {
                label : "Amount paid",
                field : "amount",
                sort : "asc"
              },
              {
                label : "Payment status",
                field : "status",
                sort : "asc"
              },
              {
                label : "Order status",
                field : "orderStatus",
                sort : "asc"
              },

              {
                label : "Actions",
                field : "actions",
                sort : "asc"
              }
        ],
        roes : []
    };
    data?.orders?.forEach((order)=>{
        orders.roes.push({
            id : order?._id,
            amount : `$${order?.totalAmount}`,
            status : order?.paymentInfo?.status.toUpperCase(),
            orderStatus : order?.orderStatus,
            actions :   <>
             <Link to={`/me/orders/${order._id}`} className="btn btn-primary">
             <i className="fa fa-eye"></i>
             </Link>   
             <Link to={`/invoice/order/${order._id}`} className="btn btn-primary ms-2">
             <i className="fa fa-print"></i>
             </Link>   
                </>
            
        })
    })
    return orders
   }
    if(isLoading) return <Loader/>
  return (
    <div>
    <h1 className=" my-5">{data?.order?.length}orders</h1>
    <MDBDataTable data={setOrder()} className=" px-3" bordered striped hover/>
    </div>
  )
}

export default MyOrder