import React,{useState,useEffect} from "react";
import {Form,Button, Row} from "react-bootstrap"
import { useDispatch,useSelector } from "react-redux";
import { register } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const RegisterScreen = ({mode}) => {
    const navigate = useNavigate()
    const {user} = useSelector(state => state.userLogin)
    const {user: registerMessage,error} = useSelector(state => state.userRegister)
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
            <h3 className="text-center">{mode.toUpperCase()} Register Form</h3>
            {error && <Message variant='danger' message={error} />}
            {/* {registerMessage && <Message variant='success' message={registerMessage} />} */}
            <FormContainer>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                   <Form.Label htmlFor="name">Name: </Form.Label>
                   <Form.Control type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                   <Form.Label htmlFor="password">Password: </Form.Label>
                   <Form.Control type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                   <Form.Label htmlFor="email">Email: </Form.Label>
                   <Form.Control type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                {mode === 'user' ? <>
                <Form.Group>
                   <Form.Label htmlFor="role">Role: </Form.Label>
                   <Form.Control type="text" name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} /> 
                </Form.Group>
                </> : null}
                {mode === 'user' && <div style={{display: 'flex', justifyContent: 'space-between', margin: '15px 0'}}>
                   <Button style={{display: 'inline'}} onClick={zoneSelectionHandler}>Select Zone</Button>
                   <Button style={{display: 'inline'}} onClick={branchSelectionHandler}>Select Branch</Button>
                   <Button style={{display: 'inline'}} onClick={plantSelectionHandler}>Choose a plant</Button>
                </div>}
                {mode === 'user' ? zoneRequest && <><label htmlFor="zone">Choose a zone: </label>
                    
                    <select id="zone" name="zone" form="zone-name" onChange={(e) => setZone(e.target.value)}>
                        {zones && zones.length >0 && zones.map(zone => (
                            <option key={zone.zone_id} value={zone.zone_id}>{zone.name}</option>
                        ))}
                    </select></> : null}
                
                {mode === 'user' ? branchRequest && <><label htmlFor="branch">Choose a branch: </label>
                    
                    <select id="branch" name="branch" form="branch-name" onChange={(e) => setBranch(e.target.value)}>
                        {branches && branches.length >0 && branches.map(branch => (
                            <option key={branch.id} value={branch.id}>{branch.name}</option>
                        ))}
                </select></> : null} 
                
                
                {mode === 'user' ? plantRequest && <><label htmlFor="plant">Choose a plant: </label>   
                    <select id="plant" name="plant" form="plant-name" onChange={(e) => setPlant(e.target.value)}>
                        {plants && plants.length >0 && plants.map(plant => (
                            <option key={plant.plant_id} value={plant.plant_id}>{plant.name}</option>
                        ))}
                </select></> : null}    
                <Button type="submit" style={{marginTop: '20px', display: 'block'}}>Register</Button>
            </Form>
            </FormContainer>
        </>
    )
}

export default RegisterScreen