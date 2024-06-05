import { Link } from "react-router-dom"
import { useRegisterMutation } from "../../redux/api/authApi"
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const Register = () => {
    const[user, setUser] = useState({
        name : "",
        email : "",
        password : ""
    })
    const {name, email, password} = user
  const[register, {isLoading, error, data}] =  useRegisterMutation();
  
useEffect(()=>{
if (error) {
    toast?.error(error?.data.message)
}
},[error])
const submitHandler =(e)=>{
e.preventDefault()
const registerData ={
    name,
    email,
    password,
}
register(registerData)
}
const onChange = (e) =>{
    setUser({...user, [e.target.name] : e.target.value})
}

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">

            <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign up for an account
            </h2>


            <form className="space-y-6" method="POST" onSubmit={submitHandler}>

                <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Username</label>
                    <div className="mt-1">
                        <input name="name" type="name" required
                        value={name}
                        onChange={onChange}

                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                        <input name="email" type="email-address" autoComplete="email-address" required
                        value={email}
                        onChange={onChange}
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1">
                        <input name="password" type="password" autoComplete="password" required
                        value={password}
                        onChange={onChange}
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                </div>

               
                <div>
                    <button type="submit"
                        className={`flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:${isLoading}`}>
                            {isLoading ? "Creating.." : " Register Account"}
                           
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
                      Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default Register