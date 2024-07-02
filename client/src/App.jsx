
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import ItemsIn from './components/Items-in'
import ItemsSold from './components/Items-sold'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/items-in' element={<ItemsIn />}></Route>
        <Route path='/items-sold' element={<ItemsSold />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

