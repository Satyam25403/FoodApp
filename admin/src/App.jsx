import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
import Add from './pages/Add/Add'

// for sending notifications on screen/window
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {

  const url="http://localhost:4000"

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>

        {/* set routes */}
        <Routes>

          {/* mount Add component to /add path */}
          <Route path="/add" element={<Add url={url}/>} />

          {/* mount List component to /list path */}
          <Route path="/list" element={<List url={url}/>} />

          {/* mount Orders component to /orders path */}
          <Route path="/orders" element={<Orders url={url}/>} />
          
        </Routes>
      </div>
    </div>
  )
}

export default App