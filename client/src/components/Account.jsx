import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Account() {
    
    return (
        <div className="flex bg-gray-200 px-2">
            <Navbar />
            <div className="h-screen w-full px-2">
                <div className="flex h-20 py-4 justify-end mt-3 mb-7">
                    <Link to="/" className=" px-3 text-md font-bold bg-red-600 hover:bg-red-400 text-white py-2 rounded-md">
                                    Logoutt
                    </Link>
                </div>
                <div className="flex flex-col mt-8 gap-7 items-center w-full bg-gray-200 py-3">
                    <div>
                        <h1 className="text-4xl font-bold leading-10">
                            MORIAH ERP SYSTEM
                        </h1>
                    </div>
                    <div>{ 
                                <div>
                                    <h2  className="text-3xl text-blue-600">{`Welcome ${name.name}`}</h2>
                                </div> 
                            }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;