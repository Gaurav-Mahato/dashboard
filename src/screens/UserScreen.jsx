import React,{useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import {logout} from "../actions/authActions"
import {Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BarGraph } from "../components/BarGraph"
import LineGraph from "../components/LineGraph"
import { arrayMaker, meanMaker, minMaxDiffMaker, valueMaker, weightedMeanMaker } from "../utils/dataGenerator"
import BarChart from "../components/BarChart"
import LineChart from "../components/LineChart"

const UserScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.userLogin)
    const [zoneData, setZoneData] = useState([])
    const [branchData, setBranchData] = useState([])
    const [plantData, setPlantData] = useState([])
    const [dummyData, setDummyData] = useState(() => {
        axios.get('http://localhost:8080/data/dummy').then(res => setDummyData(res.data))
    })
    const zoneHandler = (e) => {
        const zone_name = e.target.innerText
        const config = {
            headers: {
                'Content-Type': "application/json",
                authorization: user.token
            }
        }
        axios.post('http://localhost:8080/data/zone',{zone_name},config).then(res => setZoneData(res.data)).catch(err => console.error(err))
    }
    const branchHandler = (e) => {
        e.preventDefault()
        const branch_name = e.target.innerText
        const config = {
            headers: {
                'Content-Type': "application/json",
                authorization: user.token
            }
        }
        axios.post('http://localhost:8080/data/branch',{branch_name},config).then(res => setBranchData(res.data))
    }
    const plantHandler = (e) => {
        e.preventDefault()
        const plant_name = e.target.innerText
        const config = {
            headers: {
                'Content-Type': "application/json",
                authorization: user.token
            }
        }
        axios.post('http://localhost:8080/data/plant',{plant_name},config).then(res => setPlantData(res.data))

    }
    const [location, setLocation] = useState(() => {
        if(user){
            const config = {
                headers:{
                    'Content-Type': "application/json",
                    Authorization: `${user.token}`
                }
            }
            axios.get("http://localhost:8080/data",config).then(res => setLocation(res.data))
        }
    })
    const logoutHandler = (e) => {
        e.preventDefault()
        dispatch(logout())
    }
    
    useEffect(() => {
        if(!user){
            navigate("/user-login")
        }
    },[navigate,user])
    return(
        <>
            {user ? <h1>Hello {user.name}</h1> : <h1>Hello User</h1>}
            <h3>Zones</h3>
            {location && location.zone !== 'NOT PERMITTED' ? location.zone.map(zone => <p key={zone.zone_id} onClick={zoneHandler}>{zone.name}</p>) : <p>Not allowed to access</p>}
            <h3>Branches</h3>
            {location && location.branch !== 'NOT PERMITTED' ? location.branch.map(branch => <p key={branch.id} onClick={branchHandler}>{branch.name}</p>) : <p>Not allowed to access</p>}
            <h3>Plants</h3>
            {location && location.plant.map(plant => <p key={plant.plant_id} onClick={plantHandler}>{plant.name}</p>)}
            <Button onClick={logoutHandler}>Log Out</Button>
            
            {/* Zone related graphs */}
            {zoneData && zoneData.length !== 0 ? <BarGraph name={`Material-Wise Data of ${zoneData[0].Zone}`} data={zoneData} distinction="Material Number" quantity="Billed Quantity" colour="red" handler={valueMaker} />: null}
            {zoneData && zoneData.length !== 0 ? <LineGraph name={`Material-Wise Data of ${zoneData[0].Zone}`} data={zoneData} distinction="Material Number" />: null}
            {zoneData && zoneData.length !== 0 ? <BarGraph name={`Customer Data of ${zoneData[0].Zone}`} data={zoneData} distinction="Customer group" quantity="Billed Quantity" colour="red" handler={valueMaker} />: null}
            {zoneData && zoneData.length !== 0 ? <LineGraph name={`Customer-Group Wise Data of ${zoneData[0].Zone}`} data={zoneData} distinction="Customer group" />: null}
            {/* End */}

            {/* Branch related graphs */}
            {branchData && branchData.length !== 0 ? <BarGraph name={`Material-Wise Data of ${branchData[0].Region}`} data={branchData} distinction="Material Number" quantity="Billed Quantity" colour="blue" handler={valueMaker} />: null}
            {branchData && branchData.length !== 0 ? <LineGraph name={`Material-Wise Data of ${branchData[0].Region}`} data={branchData} distinction="Material Number" />: null}
            {branchData && branchData.length !== 0 ? <BarGraph name={`Plant-Wise Data of ${branchData[0].Region}`} data={branchData} distinction="Plant" quantity="Billed Quantity" colour="blue" handler={valueMaker} /> : null} 
            {branchData && branchData.length !== 0 ? <LineGraph name={`Plant-Wise asp pam mom Data of ${branchData[0].Region}`} data={branchData} distinction="Plant" /> : null}
            {branchData && branchData.length !== 0 ? <BarGraph name={`Customer group wise Data of ${branchData[0].Region}`} data={branchData} distinction="Customer group" quantity="Billed Quantity" colour="blue" handler={valueMaker} /> : null}
            {branchData && branchData.length !== 0 ? <LineGraph name={`Customer group MOM PAM asp analysis of ${branchData[0].Region}`} data={branchData} distinction="Customer group" /> : null}
            {branchData && branchData.length !==0 ? <div style={{"width": "700px", "marginBottom": "40px"}}>
            <h3>Web Price and asp comparison</h3>
            <BarChart chartData={{
                labels: arrayMaker(branchData,'Plant'),
                datasets: [
                    {
                        label: 'asp',
                        data : weightedMeanMaker(branchData,'Plant','asp'),
                        backgroundColor: 'blue',
                        type: 'bar'
                    },
                    {
                        label: 'Web Price',
                        data: meanMaker(branchData,'Plant','Web_Price'),
                        backgroundColor: 'green',
                        type: 'line',
                        borderColor: 'green'
                    }
                ]
              }} />
            </div> : null}
            {/* End */}

            {/* Plant Wise Data */}
            {plantData && plantData.length !== 0 ? <BarGraph name={`Material-Wise Data of ${plantData[0].Plant}`} data={plantData} distinction="Material Number" quantity="Billed Quantity" colour="green" handler={valueMaker} />: null} 
            {plantData && plantData.length !== 0 ? <LineGraph name={`Material-Wise Data of ${plantData[0].Plant}`} data={plantData} distinction="Material Number" />: null}
            {plantData && plantData.length !== 0 ? <BarGraph name={`Customer group wise Data of ${plantData[0].Plant}`} data={plantData} distinction="Customer group" quantity="Billed Quantity" colour="green" handler={valueMaker} /> : null}
            {plantData && plantData.length !== 0 ? <LineGraph name={`Customer group MOM PAM asp analysis of ${plantData[0].Plant}`} data={plantData} distinction="Customer group" /> : null}
            {/* End */}

            {dummyData && <div style={{"width": "700px", "marginBottom": "40px"}}>
            <h3>ASP trends</h3>
            <BarChart chartData={{
                labels: arrayMaker(dummyData,'MICRO MARKET'),
                datasets: [
                    {
                        label: '',
                        data : valueMaker(dummyData,'MICRO MARKET','MIN'),
                        backgroundColor: 'rgba(0, 0, 0, 0.01)',
                        type: 'bar',
                        stack: 'combined'
                    },
                    {
                        label: 'Difference',
                        data : minMaxDiffMaker(dummyData),
                        backgroundColor: 'rgba(255, 205, 86, 0.5)',
                        type: 'bar',
                        stack: 'combined'
                    },
                    {
                        label: 'ASP',
                        data: weightedMeanMaker(dummyData,'MICRO MARKET','asp'),
                        backgroundColor: 'green',
                        type: 'line',
                        borderColor: 'green',
                        tension: 0.2
                    },
                ]
              }} />
            </div> }
            
            
        </>
    )
}

export default UserScreen