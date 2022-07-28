import React from 'react'
import { getDatasetAtEvent } from 'react-chartjs-2';
import {Routes, Route} from "react-router-dom"
import DashboardScreen from './screens/DashboardScreen';
import RegisterScreen from './screens/RegisterScreen';
import { BrowserRouter as Router } from "react-router-dom";
import AdminScreen from './screens/AdminScreen';
import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';
import './bootstrap.min.css'

const App = () => {
  return(
    <div className='app'>
     <Router>
      <Routes>
         <Route exact path="/" element={<DashboardScreen />} />
         <Route path="/admin-register" element={<RegisterScreen mode="admin" />} />
         <Route path="/admin" element={<AdminScreen />} />
         <Route path="/admin-login" element={<LoginScreen mode="admin" />} />
         <Route path="/user" element={<UserScreen />} />
         <Route path="/user-login" element={<LoginScreen mode="user" />} />
         <Route path="/user-register" element={<RegisterScreen mode="user" />} />
      </Routes>
     </Router>
    </div>
  )
}

export default App