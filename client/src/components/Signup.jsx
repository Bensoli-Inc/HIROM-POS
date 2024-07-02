import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register', {name, email, password})
        .then(result => {console.log(result)
            navigate('/login')
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
                    <h2 className="text-xl text-blue-500">Register</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-blue-700 font-semibold mb-2">
                            Name
                        </label>
                        <input 
                            id="name"
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="border border-blue-300 w-full rounded-md mt-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                            type="text"
                            id="password"
                            placeholder="Create a password"
                            autoComplete="off"
                            name="name"
                            className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Register
                    </button>
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account?
                    </p>
                </form>
                <Link to="/login" className="block text-center border border-blue-300 bg-blue-100 text-blue-700 py-2 rounded-md mt-4 hover:bg-blue-200 transition-colors">
                        Login
                </Link>
            </div>
        </div>

    );
}

export default Signup;