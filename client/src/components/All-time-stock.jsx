import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";



function AllTimeStock() {
    const [stock, setStock] = useState([]);

    const fetchData = async () =>{
        const data = await axios.get("http://localhost:3001/stock")
        setStock(data.data)
    }

    useEffect(()=> {
        fetchData();
    }, []);

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
                <div className="bg-white w-full h-72 flex flex-col rounded-lg justify-center items-center">
                    <h2 className="text-4xl py-4 font-bold leading-10 text-blue-500">
                        ALL TIME STOCK
                    </h2>  
                </div>
                <div className="bg-white w-full h-screen flex flex-col items-center rounded-lg">
                    <h1 className="text-xl font-bold py-3 text-center ">All items supplied</h1>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Item</th>
                            <th className="border px-4 py-2">Quantity</th>
                            <th className="border px-4 py-2">Pieces</th>
                            <th className="border px-4 py-2">Total</th>
                            <th className="border px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stock &&
                            stock.map((transaction, index) => (
                                <tr key={index}>
                                <td className="border px-4 py-2">{transaction.itemName}</td>
                                <td className="border px-4 py-2">{transaction.quantity}</td>
                                <td className="border px-4 py-2">{transaction.pieces}</td>
                                <td className="border px-4 py-2">Ksh{transaction.total}</td>
                                <td className="border px-4 py-2">{transaction.date}</td>
                                </tr>
                            ))}
                        </tbody>
                     </table>
                </div>  
            </div>
        </div>
    );
}

export default AllTimeStock;