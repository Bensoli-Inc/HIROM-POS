import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login () {
   
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', {email, password})
        .then(result => {
            console.log(result)
            if(result.data === "Success") {
                navigate('/account')
            }
        })
        .catch(err=> console.log(err))
    }
  
    return (
        <div className="flex justify-center items-center bg-blue-100 h-screen">
            <div className="bg-white p-6 rounded-lg w-96 shadow">
                <div className="flex flex-col justify-center items-center gap-2 font-bold mb-4">
                    <h1 className="text-2xl text-blue-700">
                        MORIAH
                    </h1>
                    <h2 className="text-xl text-blue-500">Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="name" className="block text-blue-700 font-semibold mb-2">
                            Email
                        </label>
                        <input 
                            type="text"
                            id="email"
                            placeholder="Enter your email"
                            autoComplete="off"
                            name="name"
                            className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                         <label htmlFor="name" className="block text-blue-700 font-semibold mb-2">
                            Password
                        </label>
                        <input 
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            autoComplete="off"
                            name="password"
                            className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;