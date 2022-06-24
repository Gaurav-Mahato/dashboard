import React from 'react'
import { getDatasetAtEvent } from 'react-chartjs-2';
import {Routes, Route} from "react-router-dom"
import DashboardScreen from './screens/DashboardScreen';
import RegisterScreen from './screens/RegisterScreen';
import { BrowserRouter as Router } from "react-router-dom";
import AdminScreen from './screens/AdminScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return(
    <div className='app'>
     <Router>
      <Routes>
         <Route path="/" element={<DashboardScreen />} />
         <Route path="/register" element={<RegisterScreen />} />
         <Route path="/admin-panel" element={<AdminScreen />} />
         <Route path="/login" element={<LoginScreen />} />
      </Routes>
     </Router>
    </div>
  )
}

export default App