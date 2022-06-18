import React, { useEffect, useState } from 'react'
import BarChart from './components/BarChart'
import { getDatasetAtEvent } from 'react-chartjs-2';
import axios from "axios";

const App = () => {
  const [userData, setUserData] = useState(() => {
    axios.get("http://localhost:8080/")
      .then(res => {
        setUserData({
          zone: {
            labels: res.data.zone,
            datasets: [
              {
                label: 'Billed Quantity',
                data: res.data.zoneValue,
                backgroundColor: 'green' 
              }
            ]
          },
          material : {
            labels: res.data.material,
            datasets: [
              {
                label: 'Billed Quantity',
                data: res.data.materialValue,
                backgroundColor: 'red' 
              }
            ]
          },
          date : {
            labels: res.data.date,
            datasets: [
              {
                label: 'Billed Quantity',
                data: res.data.dateValue,
                backgroundColor: 'red' 
              }
            ]
          }
        })
      })
  });
  return (
   <>
    {userData && <div style={{"width": "700px", "marginBottom": "40px"}}><BarChart chartData={userData.material} /></div>}
    {userData && <div style={{"width": "700px", "marginBottom": "40px"}}><BarChart chartData={userData.zone} /></div>}
    {userData && <div style={{"width": "700px", "marginBottom": "40px"}}><BarChart chartData={userData.date} /></div>}
    <div>Hello World</div>
   </>
  )
}

export default App