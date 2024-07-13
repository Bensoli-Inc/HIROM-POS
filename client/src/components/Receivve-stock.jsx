import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function IncomingStock () {
    const [itemName, setItemName] = useState();
    const [quantity, setQuantity] = useState();
    const [pieces, setPieces] = useState();
    const [pricePerQuantity, setPricePerQuantity] = useState();
    const [total, setTotal] = useState(0);
    const [stock, setStock] = useState([]);

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
            <div className="flex flex-col p-3 gap-3 items-center h-screen bg-gray-200 w-full">
                <div className="bg-white w-full h-48 flex rounded-lg justify-center items-center">
                    <h2 className="text-4xl py-4 font-bold leading-10 text-blue-500">
                        Stock receiving Point
                    </h2>    
                </div>
                <div className="bg-white w-full h-screen flex flex-col items-center rounded-lg">
                    <form >
                        <div className="flex gap-2 py-6">
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                        Item
                                </label>
                                <select name="item" 
                                        id="item" 
                                        value={itemName}
                                        className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300">
                                    <option value="chrome">Chrome</option>
                                    <option value="vodka">Vodka</option>
                                    <option value="captain-morgan">Captain Morgan</option>
                                    <option value="hunters-choice">Hunters Choice</option>
                                    <option value="gilbeys">Gilbeys</option>
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Quantity
                                </label>
                                <select name="quantity" 
                                        value={quantity}
                                        id="quantity"                        
                                        className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300">
                                    <option value="1-litre">1 Litre</option>
                                    <option value="750-ml">750 ml</option>
                                    <option value="300-ml">300 ml</option>
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Pieces
                                </label>
                                <input 
                                    type="number" 
                                    value={pieces}
                                    placeholder="Total pcs"
                                    className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    
                                />
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Price per Quantity
                                </label>
                                <input 
                                    type="number" 
                                    value={pricePerQuantity}
                                    placeholder="Price per Piece"
                                    className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    
                                />
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Total
                                </label>
                                <input 
                                    type="text" 
                                    value={total}
                                    readOnly
                                    className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                />
                            </div> 
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Compute
                                </label>
                                <button 
                                    type="submit" 
                                    className="w-full bg-red-500 text-white text-center py-2 px-2 rounded-md hover:bg-red-700 transition-colors"
                                    
                                >
                                    update Stock
                                </button>
                             </div> 

                        </div>
                    </form> 
                      {/* Transaction Table */}
                
                    <h1 className="text-xl font-bold py-3 text-center ">Update your Stock</h1>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Item</th>
                                <th className="border px-4 py-2">Quantity</th>
                                <th className="border px-4 py-2">Pieces</th>
                                <th className="border px-4 py-2">Total</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Approve</th>
                                <th className="border px-4 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                
                    </div>
            </div>
        </div>
    )
}

export default IncomingStock;