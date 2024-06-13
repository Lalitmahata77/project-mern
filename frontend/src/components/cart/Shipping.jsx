import { useEffect, useState } from "react"
import {countries} from "countries-list"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingInfo } from "../../redux/features/cartSlice"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "./CheckOutStep";
const Shipping = () => {
    const navigate = useNavigate()
    const countriesList = Object.values(countries)
   const dispatch = useDispatch()
    const[address, setAddress] = useState("")
    const[city, setCity] = useState("")
    const[phoneNo, setPhoneNm] = useState("")
    const[zipCode, setZipcode] = useState("")
    const[country, setCountry] = useState("")
    const {shippingInfo} = useSelector((state)=>state.cart)
    useEffect(()=>{
if (shippingInfo) {
    setAddress(shippingInfo?.address)
    setCity(shippingInfo?.city)
    setPhoneNm(shippingInfo?.phoneNo)
    setZipcode(shippingInfo?.zipCode)
    setCountry(shippingInfo?.country)
}
    },[shippingInfo])

    const submitHandler = (e) => {
        e.preventDefault()
dispatch(saveShippingInfo({address, city, phoneNo, zipCode, country}))
navigate("/confirm_order")
    }
  return (
   
    // <div className="bg-gray-100 dark:bg-gray-900">

    <>
    <CheckoutSteps shipping  />
     <div className="w-full max-w-3xl mx-auto p-8">
         <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
   
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Checkout</h1>

           
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Shipping Address</h2>
              
                <form onSubmit={submitHandler}>
                <div  className="mt-4">
                    <label htmlFor="address" className="block text-gray-700 dark:text-white mb-1">Address</label>
                    <input type="text" id="address" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </div>

                <div className="mt-4">
                    <label htmlFor="city" className="block text-gray-700 dark:text-white mb-1">City</label>
                    <input type="text" id="city" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" value={city} onChange={(e)=>setCity(e.target.value)}/>
                </div>
                <div className="mt-4">
                    <label htmlFor="phoneNumber" className="block text-gray-700 dark:text-white mb-1">Phone Number</label>
                    <input type="number" id="phone" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" value={phoneNo} onChange={(e)=>setPhoneNm(e.target.value)}/>
                </div>
               
                 
                    <div>
                        <label htmlFor="zip" className="block text-gray-700 dark:text-white mb-1">ZIP Code</label>
                        <input type="text" id="zip" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" value={zipCode} onChange={(e)=>setZipcode(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-gray-700 dark:text-white mb-1">Country</label>
                        <select type="text" id="country" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" value={country} onChange={(e)=>setCountry(e.target.value)}>
                            {
                                countriesList?.map((country)=>(
                                    <option key={country?.name} value={country?.name}>{country?.name}</option>
                                ))
                            }
                    
                             </select>
                    </div>
                    <div className="mt-8 flex justify-end">
                <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">Place Order</button>
            </div>
                </form>
                </div>
                </div>
                </div>
           
            </>
  )
}

export default Shipping