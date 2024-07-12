import React from "react";
import { Link } from "react-router-dom";


function Account() {
    
    return (
        <div className="flex bg-gray-200 px-2">
            <div className="w-48 p-4 flex flex-col justify-center items-center gap-3 bg-blue-900 rounded-lg text-white h-screen shadow-lg">
                        
                        <Link to="/sell-point" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Sell 
                        </Link>
                         <Link to="/approved-sales" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Approved Sales
                        </Link>
                        <Link to="/available-stock" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Available Stock
                        </Link>
                        <Link to="/receive-stock" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Receive Stock
                        </Link>
                        <Link to="/all-time-stock" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                AllTime Stock
                        </Link>
                        <Link to="/charts" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Charts/graphs
                        </Link>

                        <Link to="/suppliers" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Suppliers
                        </Link>
                        <Link to="/account" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Account
                        </Link>
            </div>
            <div className="h-screen w-full px-2">
                <div className="flex h-20 py-4 justify-end mt-3 mb-7">
                    <Link to="/" className=" px-3 text-md font-bold bg-red-600 hover:bg-red-400 text-white py-2 rounded-md">
                                    Logout
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