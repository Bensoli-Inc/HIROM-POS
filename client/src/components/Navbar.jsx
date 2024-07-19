import { Link } from "react-router-dom"

function Navbar () {
    return (
        <div className="w-48 p-4 flex flex-col justify-center items-center gap-3 bg-blue-900 rounded-lg text-white h-screen shadow-lg">
                        
                        <Link to="/sell-point" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Sell 
                        </Link>
                        
                        <Link to="/incoming-stock" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Receive Stock
                        </Link>
                        <Link to="/available-stock" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Realtime Stock
                        </Link>
                        <Link to="/approved-sales" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Approved Sales
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
    )
}
 export default Navbar;