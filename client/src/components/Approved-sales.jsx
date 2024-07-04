import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


const ApprovedSales = () => {

  const [sales, setSales] = useState([]);

  const fetchData = async () => {
    const data = await axios.get("http://localhost:3001/approved")
    setSales(data.data)
  }
  

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="flex bg-gray-200 px-2">
          <div className="w-48 p-4 flex flex-col justify-center items-center gap-3 bg-blue-900 h-full rounded-lg text-white shadow-lg">
                            
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
          <div  className="bg-white w-full h-screen flex flex-col items-center rounded-lg">
            
            <h1 className="text-xl font-bold py-3 text-center">Approved Sales</h1>
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
                {sales &&
                  sales.map((transaction, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{transaction.itemName}</td>
                      <td className="border px-4 py-2">{transaction.quantity}</td>
                      <td className="border px-4 py-2">{transaction.pieces}</td>
                      <td className="border px-4 py-2">Ksh{transaction.total}</td>
                      <td className="border px-4 py-2">{transaction.timestamp}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

          </div>
          </div>
    </div>
  );
};


export default ApprovedSales;
