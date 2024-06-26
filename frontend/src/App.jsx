import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Home from './components/Home'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import { Toaster } from "react-hot-toast"
import ProductDetails from "./components/product/ProductDetails"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Profile from "./components/user/Profile"
import UpdateProfile from "./components/user/UpdateProfile"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import UploadAvatar from "./components/user/UploadAvatar"
import UpdatePassword from "./components/user/UpdatePassword"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"
import Cart from "./components/cart/Cart"
import Shipping from "./components/cart/Shipping"
import ConfirmOrder from "./components/cart/ConfirmOrder"
import Payment from "./components/cart/Payment"
import MyOrder from "./components/order/MyOrder"
import OrderDetails from "./components/order/OrderDetails"
import Invoice from "./components/invoice/Invoice"
function App() {
 

  return (
   <BrowserRouter>
   <Toaster/>
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path="/password/reset/:token" element={<ResetPassword/>}/>
      <Route path="/me/profile" element={
        <ProtectedRoute>
 <Profile/>
        </ProtectedRoute>
       }/>
      <Route path="/me/update_profile" element={ <ProtectedRoute>
 <UpdateProfile/>
        </ProtectedRoute>}/>
   
     <Route path="/me/upload_avatar" element={ <ProtectedRoute>
 <UploadAvatar/>
        </ProtectedRoute>}/>
        <Route path="/me/update_password" element={ <ProtectedRoute>
 <UpdatePassword/>
        </ProtectedRoute>}/>
     
     <Route path="/cart" element={<Cart/>}/>
     <Route path="/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
     <Route path="/confirm_order" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
     <Route path="/payment_method" element={<ProtectedRoute><Payment/></ProtectedRoute>}/>
     <Route path="/me/orders" element={<ProtectedRoute><MyOrder/></ProtectedRoute>}/>
     <Route path="/me/orders/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
     <Route path="/invoice/orders/:id" element={<ProtectedRoute><Invoice/></ProtectedRoute>}/>
     </Routes>
     <Footer/>
   </BrowserRouter>
  
  )
}

export default App
