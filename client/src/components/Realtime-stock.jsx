import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function AvailableStock() {
    return (
        <div className="flex bg-gray-200 px-2">
            <Navbar />
            <div className="flex flex-col p-3 gap-3 items-center h-screen bg-gray-200 w-full">
                <div className="bg-white w-full h-72 flex flex-col rounded-lg justify-center items-center">
                    <h2 className="text-4xl py-4 font-bold leading-10 text-blue-500">
                        REALTIME STOCK
                    </h2> 
                    
                </div>

                <div className="bg-white w-full h-screen flex flex-col items-center rounded-lg">
                    <h1 className="text-xl font-bold py-3 text-center ">Items available in stock</h1>
                </div>
            </div>
        </div>
    );
}

export default AvailableStock;