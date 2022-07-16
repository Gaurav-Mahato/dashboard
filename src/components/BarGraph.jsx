import React from 'react'
import { arrayMaker, valueMaker } from '../utils/dataGenerator'
import BarChart from './BarChart'

const BarGraph = ({data,name,quantity,distinction,colour}) => {
  return (
    <div style={{"width": "700px", "marginBottom": "40px"}}>
            <h3>{name}</h3>
            <BarChart chartData={{
                labels: arrayMaker(data,distinction),
                datasets: [
                    {
                        label: quantity,
                        data : valueMaker(data,distinction,quantity),
                        backgroundColor: colour
                    }
                ]
            }} />
    </div> 
  )
}

export default BarGraph