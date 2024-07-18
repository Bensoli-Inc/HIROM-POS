import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";


const AvailableStock = ()=> {
    const [realStock, setRealStock] = useState([]);
    // const [message, setMessage] = useState('');



    const fetchRealData = async () =>{
        const data = await axios.get("http://localhost:3001/final-realtime-stock")
        setRealStock(data.data)
    }

    useEffect(()=> {
        fetchRealData();
    }, []);

    // Function to clean up stock items with pieces less than 1
    
    const deleteFinishedRealStock = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/realtime-finished-stock/${id}`);
            fetchRealData();
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };  

    useEffect(() => {
        const cleanUpFinishedStock = async () => {
            // Iterate through realStock and delete items with pieces < 1
            realStock.forEach(item => {
                if (item.pieces < 1) {
                    deleteFinishedRealStock(item._id);
                }
            });
        };

        // Call cleanUpFinishedStock immediately when the component mounts or when realStock changes
        cleanUpFinishedStock();
    }, [realStock]);
    
    return (
        <div className="flex bg-gray-200 px-2">
            <Navbar />
            <div className="flex flex-col p-3 gap-3 items-center h-screen bg-gray-200 w-full">
            
                <div className="bg-white w-full h-72 flex flex-col rounded-lg justify-center items-center">
                    <h2 className="text-4xl py-4 font-bold leading-10 text-blue-500">
                        REAL-TIME STOCK
                    </h2>  
                </div>
                <div className="bg-white w-full h-screen flex flex-col items-center rounded-lg">
                    <h1 className="text-xl font-bold py-3 text-center ">Updated Current Realtime stock</h1>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Item</th>
                                <th className="border px-4 py-2">Quantity</th>
                                <th className="border px-4 py-2">Pieces</th>
                                <th className="border px-4 py-2">Buying price PQ</th>
                                <th className="border px-4 py-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                                    {realStock.map((item) => (
                                    <tr key={item._id}>
                                        <td className="border px-4 py-2">{item.itemName}</td>
                                        <td className="border px-4 py-2">{item.quantity}</td>
                                        <td className="border px-4 py-2">{item.pieces}</td>
                                        <td className="border px-4 py-2">{item.pricePerQuantity}</td>
                                        <td className="border px-4 py-2">{item.total}</td>
                                        <td className="border px-4 py-2">
                                                    {item.pieces < 1 && (
                                                    <button
                                                        onClick={() => deleteFinishedRealStock(item._id)}
                                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                    )}
                                            </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>  
            </div>
        </div>
    );
}

export default AvailableStock;