import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  
  // we will get react router support in app component upon wrapping it up like this
  <BrowserRouter>
    <App/>
  </BrowserRouter>

  
)
