import React from "react";

import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="flex flex-col gap-3 justify-center items-center h-screen bg-gray-200">
            
            <h2 className="text-4xl font-bold leading-10">
                MORIAH ERPp SYSTEM
            </h2>
            <Link to="/login" className="w-96 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Login
            </Link>
            
        </div>
    )
}

export default Home;