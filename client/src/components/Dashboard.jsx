import { Link } from "react-router-dom";
import React from "react";
import  { useState, useEffect } from "react";

function Dashboard () {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [pieces, setPieces] = useState('');
    const [total, setTotal] = useState(0);
    const [transactions, setTransactions] = useState([]);

// Price mappings based on item and quantity
const prices = {
    chrome: {
        '1-litre': 1500,
        '750-ml': 800,
        '300-ml': 300
    },
    vodka: {
        '1-litre': 1600,
        '750-ml': 900,
        '300-ml': 400
    },
    'captain-morgan': {
        '1-litre': 1400,
        '750-ml': 600,
        '300-ml': 200
    },
    'hunters-choice': {
        '1-litre': 1800,
        '750-ml': 900,
        '300-ml': 500
    },
    gilbeys: {
        '1-litre': 2000,
        '750-ml': 1000,
        '300-ml': 600
    }
};

const handleItemChange = (e) => {
    setItemName(e.target.value);
};

const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
};

const handlePiecesChange = (e) => {
    setPieces(e.target.value);
};

// Function to calculate total based on selected item, quantity, and pieces
const calculateTotal = () => {
    if (itemName && quantity && pieces) {
        const pricePerPiece = prices[itemName][quantity];
        const totalPrice = pricePerPiece * parseFloat(pieces);
        setTotal(totalPrice.toFixed(2)); // Round to 2 decimal places
    }
};

// Function to handle button click
const handleCalculateClick = () => {
    calculateTotal();
};

// Calculate total whenever itemName, quantity, or pieces change
useEffect(() => {
    calculateTotal();
}, [itemName, quantity, pieces]);
    

 // Function to handle sale transaction
 const handleSell = () => {
    if(itemName && quantity && pieces && total > 0) {
        const transaction = {
            itemName,
            quantity,
            pieces,
            total
        };
        setTransactions([...transactions, transaction]);
        //Reset form fields after sale
        setItemName('');
        setQuantity('');
        setPieces('');
        setTotal(0);
    }
 };

    return (
        <div className="flex">
            <div className="w-48 p-3 flex flex-col items-center gap-2">
                <h1 className=" mb-2">
                    NAVBAR
                </h1>
                <button className="border rounded p-2 text-red">
                    testing
                </button>
                <Link to="/user" className=" btn w-100 rounded-0 text-decoration-none">
                        User info
                </Link>
                <Link to="/items-in" className=" btn w-100 rounded-0 text-decoration-none">
                        Items in
                </Link>
                <Link to="/items-sold" className=" btn w-100 rounded-0 text-decoration-none">
                        Items Sold
                </Link>
                <Link to="/sales" className=" btn w-100 rounded-0 text-decoration-none">
                        Sales
                </Link>
                <Link to="/suppliers" className=" btn w-100 rounded-0 text-decoration-none">
                        Suppliers
                </Link>
                <Link to="/settings" className=" btn w-100 rounded-0 text-decoration-none">
                        Settings
                </Link>
                <Link to="/" className=" btn rounded-0 text-decoration-none">
                        Logout
                </Link>
            </div>
            <div className="flex flex-col p-3 gap-3 items-center h-screen bg-gray-200 w-full">
                <h2 className="text-4xl font-bold leading-10">
                    MORIAH dashboard
                </h2> 
                <div className="bg-white w-full h-72">
                    <form action="">
                        <div className="flex gap-2">
                            <div className="">
                            <label htmlFor="name" className="block text-blue-700 font-semibold mb-2">
                                    Item
                             </label>
                                <select name="item" id="item" 
                                        onChange={handleItemChange}
                                        className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300">
                                    <option value="chrome">Chrome</option>
                                    <option value="vodka">Vodka</option>
                                    <option value="captain-morgan">Captain Morgan</option>
                                    <option value="hunters-choice">Hunters Choice</option>
                                    <option value="gilbeys">Gilbeys</option>
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-blue-700 font-semibold mb-2">
                                    Quantity
                                </label>
                                <select name="quantity" id="quantity" 
                                onChange={handleQuantityChange}
                                        className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300">
                                    <option value="1-litre">1 Litre</option>
                                    <option value="750-ml">750 ml</option>
                                    <option value="300-ml">300 ml</option>
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-blue-700 font-semibold mb-2">
                                    Pieces
                                </label>
                                <input 
                                    type="number" 
                                    placeholder="Total pcs"
                                    className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    onChange={handlePiecesChange}
                                />
                            </div>
                            
                            <div className="">
                                <label htmlFor="name" className="block text-blue-700 font-semibold mb-2">
                                    Total
                                </label>
                                <input 
                                    type="text" 
                                    value={`$${total}`}
                                    readOnly
                                    className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                />
                            </div> 
                            <div className="">
                                <label htmlFor="name" className="block text-blue-700 font-semibold mb-2">
                                    Compute
                                </label>
                                <button 
                                    type="button" 
                                    className="w-full bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-700 transition-colors"
                                    onClick={handleSell}
                                >
                                    Sell
                                </button>
                             </div> 

                        </div>
                    </form>
                    
                </div>

                <div className="bg-white w-full h-screen flex flex-col items-center">
                      {/* Transaction Table */}
                
                    <h1 className="text-xl font-bold mb-4">Sales Transactions</h1>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Item</th>
                                <th className="border px-4 py-2">Quantity</th>
                                <th className="border px-4 py-2">Pieces</th>
                                <th className="border px-4 py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{transaction.itemName}</td>
                                    <td className="border px-4 py-2">{transaction.quantity}</td>
                                    <td className="border px-4 py-2">{transaction.pieces}</td>
                                    <td className="border px-4 py-2">${transaction.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
                    </div>
                </div>
            </div>
    )
}

export default Dashboard;