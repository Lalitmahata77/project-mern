
import { useEffect, useState } from "react";
import CheckoutSteps from "./CheckOutStep";
import { useSelector } from "react-redux";
import { caluclateOrderCost } from "../../helpers/helper";
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from "../../redux/api/orderApi";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
const Payment = () => {
    const[method, setMethod] = useState("")
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const [createNewOrder, {error, isSuccess}] = useCreateNewOrderMutation()
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);
    const [stripeCheckoutSession, {data:checkoutData, error : checkoutError}] = useStripeCheckoutSessionMutation()
const navigate = useNavigate()

useEffect(()=>{
  if (checkoutData) {
    window.location.href = checkoutData?.url
  }
  console.log(checkoutData);

  if (checkoutError) {
    toast.error(error?.data?.message)
  }
},[checkoutData, checkoutError])
useEffect(()=>{
  if (error) {
    toast.error(error?.data?.message)
  }
  if (isSuccess) {
    navigate("/me/orders?order_success=true")

  }
},[error,isSuccess])


    const submitHandler =(e)=>{
e.preventDefault()
if (method === "COD") {
    alert("COD")
    const orderData ={
      shippingInfo,
      orderItems : cartItems,
      itemsPrice, 
     shippingAmount : shippingPrice,taxAmount : taxPrice,totalAmount : totalPrice,
      paymentInfo : {
        status : "Not paid"
      },
      paymentMethod : "COD"
    }
    createNewOrder(orderData)
}
if (method === "Card") {
   
    const orderData ={
      shippingInfo,
      orderItems : cartItems,
      itemsPrice, 
     shippingAmount : shippingPrice,taxAmount : taxPrice,totalAmount : totalPrice,
     
    }
stripeCheckoutSession(orderData)
}
    }
  return (
    <>
     <CheckoutSteps shipping confirmOrder payment />
    <div className="row wrapper">
    <div className="col-10 col-lg-5">
      <form
        className="shadow rounded bg-body"
       onSubmit={submitHandler}
      >
        <h2 className="mb-4">Select Payment Method</h2>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="payment_mode"
            id="codradio"
            value="COD"
            onChange={()=>setMethod("COD")}
          />
          <label className="form-check-label" htmlFor="codradio">
            Cash on Delivery
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="payment_mode"
            id="cardradio"
            value="Card"
            onChange={()=>setMethod("Card")}
          />
          <label className="form-check-label" htmlFor="cardradio">
            Card - VISA, MasterCard
          </label>
        </div>

        <button id="shipping_btn" type="submit" className="btn py-2 w-100">
          CONTINUE
        </button>
      </form>
    </div>
  </div>
  </>
  )
}

export default Payment