import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateProfileMutation } from "../../redux/api/userApi"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import UserLayout from "../layout/UserLayout"
const UpdateProfile = () => {
    const [name, setName] = useState("")
    const  [email, setEmail] = useState("")
        const navigate = useNavigate()
       const[updateProfile, {isLoading, isSuccess, error}] = useUpdateProfileMutation()
    
       const {user} = useSelector((state)=> state.auth)
    
       useEffect(()=>{
        if (user) {
            setName(user?.name)
            setEmail(user?.email)
        }
        if (error) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success("User updated")
            navigate("/me/profile")
        }
       },[user, error, isSuccess])

       const submitHandler = (e) =>{
        e.preventDefault()
        const userData={
            name,
            email
        }
        updateProfile(userData)
        console.log(updateProfile(userData));
       }
      return (
        <UserLayout>
        <div className="flex justify-center mt-20 px-8">
        <form className="max-w-2xl" onSubmit={submitHandler}>
            <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
                <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">Account settings:</h2>
    
                <div className="flex flex-col gap-2 w-full border-gray-400">
    
                    <div>
                        <label className="text-gray-600 dark:text-gray-400" htmlFor="name_field">User
                        {" "}
                        Name{" "}
                        </label>
                        <input
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                            type="text" id="name_field" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
    
                    <div>
                        <label className="text-gray-600 dark:text-gray-400" htmlFor="email_field"> {" "}
                        Email{" "}</label>
                        <input
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                            type="email" id="name_field" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
    
                  
                    <div className="flex justify-end">
                        <button
                            className="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700" disabled={isLoading}
                            type="submit">{isLoading ? "updating.." : "Save changes"}</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </UserLayout>
      )
    }
    
    export default UpdateProfile