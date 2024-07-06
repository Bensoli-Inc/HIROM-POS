import React from "react";
import { Link } from "react-router-dom";

function Stockin() {
    return (
        <div className="flex bg-gray-200 px-2">
            <div className="w-48 p-4 flex flex-col justify-center items-center gap-3 bg-blue-900 rounded-lg text-white h-screen shadow-lg">
                        
                        <Link to="/dashboard" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Dashboard
                        </Link>
                    
                        <Link to="/approved-sales" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Approved Sales
                        </Link>
                        <Link to="/suppliers" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Suppliers
                        </Link>
                        <Link to="/charts" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Charts/graphs
                        </Link>
                        <Link to="/settings" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Settings
                        </Link>
                       
            </div>
            <div className="flex flex-col p-3 gap-3 items-center h-screen bg-gray-200 w-full">
                <div className="bg-white w-full h-72 flex flex-col rounded-lg justify-center items-center">
                    <h2 className="text-4xl py-4 font-bold leading-10 text-blue-500">
                        UPDATED stock
                    </h2> 
                    
                </div>

                <div className="bg-white w-full h-screen flex flex-col items-center rounded-lg">
                    <h1 className="text-xl font-bold py-3 text-center ">All items supplied</h1>
                </div>
                
            </div>
        </div>
    );
}

export default Stockin;