import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Charts() {
    return (
        <div className="flex bg-gray-200 px-2">
            <Navbar />
            <div className="flex flex-col p-3 gap-3 items-center h-screen bg-gray-200 w-full">
                <div className="bg-white w-full h-72 flex flex-col rounded-lg justify-center items-center">
                    <h2 className="text-4xl py-4 font-bold leading-10 text-blue-500">
                        vvDATA ANALYSIS
                    </h2> 
                    
                </div>

                <div className=" flex bg-white w-full h-screen justify-center items-center rounded-lg gap-3">
                    <div> 
                        <h1 className="text-xl  font-bold py-3 text-center ">Bar graph</h1>
                    </div>
                    <div>
                         <h1 className="text-xl font-bold py-3 text-center ">Pie Chart</h1>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}

export default Charts;