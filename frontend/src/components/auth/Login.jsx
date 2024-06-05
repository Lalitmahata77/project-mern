import { useEffect, useState } from "react"
import { useLoginMutation } from "../../redux/api/authApi"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

const Login = () => {
   
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [login, {isLoading, error, data}]=useLoginMutation()
    useEffect(()=>{
        if (error) {
            toast.error(error?.data?.message);
          }
    },[error])
    const submitHandler = (e)=>{
        e.preventDefault()

        const loginData = {
            email,
            password
        }
        login(loginData)
    }
  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center p-4">
    <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-md p-8">

            <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
            </h2>


            <form className="space-y-6 mt-4"  onSubmit={submitHandler}>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                        <input name="email" type="email-address" autoComplete="email-address" required
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1">
                        <input id="password" name="password" type="password" autoComplete="password" required
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                            {isLoading ? "Authenticating..." : "Log In"}
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
                      Don't have an account? <Link to="/register" className=" font-semibold text-primary-600 hover:underline dark:text-primary-500 ">Register here</Link>
                  </p>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default Login