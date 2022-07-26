import React from 'react'
import { arrayMaker, valueMaker } from '../utils/dataGenerator'
import BarChart from './BarChart'

const BarGraph = ({data,name,quantity,distinction,colour,handler}) => {
  return (
    <div style={{"width": "700px", "marginBottom": "40px"}}>
            <h3>{name}</h3>
            <BarChart chartData={{
                labels: arrayMaker(data,distinction),
                datasets: [
                    {
                        label: quantity,
                        data : handler(data,distinction,quantity),
                        backgroundColor: colour
                    }
                ]
            }} />
    </div> 
  )
}

export {BarGraph}