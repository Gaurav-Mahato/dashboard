import React from "react"
import LineChart from "./LineChart"
import { arrayMaker, weightedMeanMaker, meanMaker } from "../utils/dataGenerator"

const LineGraph = ({data,name,distinction}) => {
    return (
      <div style={{"marginBottom": "40px"}}>
              <h3>{name}</h3>
              <LineChart chartData={{
                  labels: arrayMaker(data,distinction),
                  datasets: [
                      {
                          label: 'PAM',
                          data : meanMaker(data,distinction,'PAM per cm'),
                          backgroundColor: 'red',
                          borderColor: 'red'
                      },
                      {
                        label: 'MOM',
                        data: meanMaker(data,distinction,'MOM per cm'),
                        backgroundColor: 'blue',
                        borderColor: 'blue'
                      },
                      {
                        label: 'asp',
                        data: weightedMeanMaker(data,distinction,'asp'),
                        backgroundColor: 'green',
                        borderColor: 'green'
                      }
                  ]
              }} />
      </div> 
    )
  }

export default LineGraph