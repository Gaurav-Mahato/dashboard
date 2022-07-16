import React,{useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import {logout} from "../actions/authActions"
import {Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import BarChart from "../components/BarChart"
import { arrayMaker, valueMaker } from "../utils/dataGenerator"
import BarGraph from "../components/BarGraph"

const UserScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.userLogin)
    const [zoneData, setZoneData] = useState([])
    const [branchData, setBranchData] = useState([])
    const [plantData, setPlantData] = useState([])
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
        axios.post('http://localhost:8080/data/branch',{plant_name},config).then(res => setPlantData(res.data))

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
            
            
            {zoneData.length !== 0 ? <div>Zones Loaded</div> : <div>No zones to display yet.</div>}
            {branchData.length !== 0 ? <div>Branches Loaded</div> : <div>No branches to display yet.</div>}
            {plantData.length !== 0 ? <div>Plants Loaded</div> : <div>No plants to display yet.</div>}



            {zoneData && zoneData.length !== 0 ? <BarGraph name={`Material-Wise Data of ${zoneData[0].Zone}`} data={branchData} distinction="Material Number" quantity="Billed Quantity" colour="red" />: null}
            {branchData && branchData.length !== 0 ? <BarGraph name={`Material-Wise Data of ${branchData[0].Region}`} data={branchData} distinction="Material Number" quantity="Billed Quantity" colour="blue" />: null}
            {zoneData && zoneData.length !== 0 ? <BarGraph name={`Customer Data of ${zoneData[0].Zone}`} data={zoneData} distinction="Customer group" quantity="Billed Quantity" colour="red" />: null}
            {zoneData && zoneData.length !== 0 ? <BarGraph name="MOM analysis" data={zoneData} distinction="Customer group" quantity="MOM" colour="red" />: null}
            {zoneData && zoneData.length !== 0 ? <BarGraph name="PAM analysis" data={zoneData} distinction="Customer group" quantity="PAM" colour="red" />: null}
        </>
    )
}

export default UserScreen