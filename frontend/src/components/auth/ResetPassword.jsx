import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useResetPasswordMutation } from "../../redux/api/userApi"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"

const ResetPassword = () => {
  const[passwod, setPassword] = useState("")
  const[confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()
  const{isAuthenticated} = useSelector((state)=>state.auth)
  const params = useParams()
 const[resetPassword, {isSuccess, isLoading, error}] = useResetPasswordMutation()
 useEffect(()=>{
if (isAuthenticated) {
  navigate("/")
}
if (error) {
  toast.error(error?.data?.message)
}
if (isSuccess) {
  toast.success("Password reseted successfully")
  navigate("/login")
}

 },[error, isSuccess])
 const submitHandler =(e)=>{
e.preventDefault()
if (passwod !== confirmPassword) {
  return toast.error("Password does not match. Try again")
}
const data ={
  passwod,
  confirmPassword
}
resetPassword({token : params?.token, body : data})
 }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={submitHandler}>
               
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={passwod} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                    </div>
                </div>
                <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" disabled={isLoading}>
                {isLoading ? "reseting.." : "Reset Password"} </button>
            </form>
        </div>
    </div>
  </section>
  )
}

export default ResetPassword