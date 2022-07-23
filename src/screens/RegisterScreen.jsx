import React,{useState,useEffect} from "react";
import {Form,Button} from "react-bootstrap"
import { useDispatch,useSelector } from "react-redux";
import { register } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterScreen = ({mode}) => {
    const navigate = useNavigate()
    const {user} = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [zoneRequest, setZoneRequest] = useState(false)
    const [zone, setZone] = useState(0)
    const [zones, setZones] = useState([])
    const [branchRequest, setBranchRequest] = useState(false)
    const [branch, setBranch] = useState(0)
    const [branches, setBranches] = useState([])
    const [plantRequest, setPlantRequest] = useState(false)
    const [plant, setPlant] = useState(0)
    const [plants, setPlants] = useState([])
    const [role, setRole] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        if(mode === 'user'){
            dispatch(register(name,password,email,zone,branch,plant,role,mode))
        }else if(mode === 'admin'){
            dispatch(register(name,password,email,'','','','',mode))
        }
    }
    useEffect(() => {
        if(user){
            navigate(`/${mode}`)
        }
    },[user,navigate])
    const zoneSelectionHandler = () => {
        setZoneRequest(true)
        setBranchRequest(false)
        axios.get('http://localhost:8080/data/get-zone').then(res => setZones(res.data))
        setBranch(0)
        setPlant(0)
    }
    const branchSelectionHandler = () => {
        setZoneRequest(false)
        setPlantRequest(false)
        setZone(-1)
        setPlant(0)
        axios.get('http://localhost:8080/data/getAllBranches').then(res => setBranches(res.data))
        setBranchRequest(true)
    }
    const plantSelectionHandler = () => {
        setZoneRequest(false)
        setBranchRequest(false)
        setZone(-1)
        setBranch(-1)
        axios.get('http://localhost:8080/data/getAllPlants').then(res => setPlants(res.data))
        setPlantRequest(true)
    }
    return(
        <>
            <h3>{mode.toUpperCase()} Register Form</h3>
            <Form onSubmit={submitHandler}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                {mode === 'user' ? <>
                <label htmlFor="role">Role: </label>
                <input type="text" name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} /> 
                </> : null}
                
                {mode === 'user' ? zoneRequest && <><label htmlFor="zone">Choose a zone: </label>
                    <Button onClick={zoneSelectionHandler}>Select Zone</Button>
                    <select id="zone" name="zone" form="zone-name" onChange={(e) => setZone(e.target.value)}>
                        {zones && zones.length >0 && zones.map(zone => (
                            <option key={zone.zone_id} value={zone.zone_id}>{zone.name}</option>
                        ))}
                    </select></> : null}
                {mode === 'user' ? branchRequest && <><label htmlFor="branch">Choose a branch: </label>
                    <Button onClick={branchSelectionHandler}>Select Branch</Button>
                    <select id="branch" name="branch" form="branch-name" onChange={(e) => setBranch(e.target.value)}>
                        {branches && branches.length >0 && branches.map(branch => (
                            <option key={branch.id} value={branch.id}>{branch.name}</option>
                        ))}
                </select></> : null} 
                {mode === 'user' ? plantRequest && <><label htmlFor="plant">Choose a plant: </label>
                    <Button onClick={plantSelectionHandler}>Choose a plant</Button>
                    <select id="plant" name="plant" form="plant-name" onChange={(e) => setBranch(e.target.value)}>
                        {plants && plants.length >0 && plants.map(plant => (
                            <option key={plant.plant_id} value={plant.plant_id}>{plant.name}</option>
                        ))}
                </select></> : null}    
                <Button type="submit">Register</Button>
            </Form>
        </>
    )
}

export default RegisterScreen