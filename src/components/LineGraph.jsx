import React from "react"
import LineChart from "./LineChart"
import { arrayMaker, valueMaker, weightedMeanMaker } from "../utils/dataGenerator"

const LineGraph = ({data,name,distinction}) => {
    return (
      <div style={{"width": "700px", "marginBottom": "40px"}}>
              <h3>{name}</h3>
              <LineChart chartData={{
                  labels: arrayMaker(data,distinction),
                  datasets: [
                      {
                          label: 'PAM',
                          data : valueMaker(data,distinction,'PAM'),
                          backgroundColor: 'red',
                          borderColor: 'red'
                      },
                      {
                        label: 'MOM',
                        data: valueMaker(data,distinction,'MOM'),
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