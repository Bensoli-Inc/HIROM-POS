
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Sell from './components/Sell'
import Account from './components/Account'
import ApprovedSales from './components/Approved-sales'
import ReceiveStock from './components/Receive-stock'
import IncomingStock from './components/Receivve-stock'
import AllTimeStock from './components/All-time-stock'
import Charts from './components/Charts'
import Suppliers from './components/Suppliers'
import AvailableStock from './components/Realtime-stock'




function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/account' element={<Account />}></Route>

        {/* auth pages*/}
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/' element={<Login />}></Route>

        {/* sales pages */}
        <Route path='/sell-point' element={<Sell />}></Route>
        <Route path='/approved-sales' element={<ApprovedSales />}></Route>

        {/* stock pages */}
        <Route path='/receive-stock' element={<ReceiveStock />}></Route>
        <Route path='/incoming-stock' element={<IncomingStock />}></Route>
        <Route path='/all-time-stock' element={<AllTimeStock />}></Route>
        <Route path='/available-stock' element={<AvailableStock />}></Route>
        <Route path='/suppliers' element={<Suppliers />}></Route>

        {/* data analysis pages */}
        <Route path='/charts' element={<Charts />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

