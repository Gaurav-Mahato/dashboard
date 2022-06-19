import React, { useState } from 'react'
import BarChart from './components/BarChart'
import { getDatasetAtEvent } from 'react-chartjs-2';
import axios from "axios";
import {Routes, Route} from "react-router-dom"
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return(
    <div className='app'>
      <Routes>
         <Route path="/" element={<DashboardScreen />} />
         <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </div>
  )
}

export default App