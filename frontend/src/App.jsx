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
      <Route path="/me/profile" element={<Profile/>}/>
     </Routes>
     
     <Footer/>

   </BrowserRouter>
  
  )
}

export default App
