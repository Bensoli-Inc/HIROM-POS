
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import ApprovedSales from './components/Approved-sales'
import Stockin from './components/Stock'
import Charts from './components/Charts'
import Suppliers from './components/Suppliers'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/approved-sales' element={<ApprovedSales />}></Route>
        <Route path='/stock-in' element={<Stockin />}></Route>
        <Route path='/charts' element={<Charts />}></Route>
        <Route path='/suppliers' element={<Suppliers />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

