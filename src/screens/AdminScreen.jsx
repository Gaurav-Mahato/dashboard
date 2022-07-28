import React,{useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {Form, Button} from "react-bootstrap"
import axios from "axios";
import { logout } from "../actions/authActions";
import FormContainer from "../components/FormContainer";

const AdminScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.userLogin)
    const [mode,setMode] = useState('zone')
    const [zone,setZone] = useState('')
    const [branch, setBranch] = useState('')
    const [plant, setPlant] = useState('')
    const [zones,setZones] = useState([])
    const [success, setSuccess] = useState(false)
    const [branches, setBranches] = useState([])
    const submitHandler = (e) => {
        e.preventDefault()
        const config = {
            headers:{
                'Content-Type': "application/json",
                Authorization: `${user.token}`
            }
        }
        if(mode === 'zone'){
            axios.post("http://localhost:8080/admin/update",{zone},config)
        }else if(mode === 'branch'){
            axios.post('http://localhost:8080/admin/update/branch',{
                branch,
                zone: Number(zone)
            },config)
            setSuccess(true)
        }
        else if(mode === 'plant'){
                axios.post('http://localhost:8080/admin/update/plant',{
                  plant,
                  branch: Number(branch)
                },config)
               setSuccess(true)
            
        }
    }
    useEffect(() => {
        if(user === undefined || user === {}){
            navigate("/admin-login")
        }
    },[navigate,user])
    const logoutHandler = (e) => {
        e.preventDefault()
        dispatch(logout())
    }
    return(
        <>
            
            <h3 className="text-center">Admin Panel</h3>
            {success && <p>Successfully Added</p>}
            <div style={{display: 'flex',justifyContent: 'center'}}>
                <Button style={{margin: '0 10px 40px'}} onClick={() => setMode('zone')}>Zone</Button>
                <Button style={{margin: '0 10px 40px'}} onClick={() => {
                    setMode('branch')
                    axios.get('http://localhost:8080/data/get-zone').then(res => setZones(res.data))  
                }}>Branch</Button>
                <Button style={{margin: '0 10px 40px'}} onClick={() => {
                    setMode('plant')
                    axios.get('http://localhost:8080/data/get-zone').then(res => setZones(res.data))  
                }}>Plant</Button>
                <Button style={{margin: '0 10px 40px'}} onClick={logoutHandler}>Log out</Button>
            </div>
            {/* Zone section */}
            {mode === 'zone' && <div>
            <FormContainer>
                <h5>Add a zone</h5>
                <Form onSubmit={submitHandler}>
                    <label htmlFor="zone">Zone: </label>
                    <input type="text" name="zone" value={zone} onChange={(e) => setZone(e.target.value)}></input><br></br>
                    <Button style={{marginTop: '15px'}} type="submit">Update</Button>
                </Form>
            </FormContainer>
            </div>}

            {/* Branch Section */}
            {mode === 'branch' && <div>
            <FormContainer>
                <h5>Add a branch</h5>
                
                <Form onSubmit={submitHandler}>
                    <label htmlFor="zone">Choose a zone: </label>
                    <select id="zone" name="zone" form="zone-name" onChange={(e) => setZone(e.target.value)}>
                        {zones && zones.length >0 && zones.map(zone => (
                            <option key={zone.zone_id} value={zone.zone_id}>{zone.name}</option>
                        ))}
                    </select>
                    <label htmlFor="branch">Branch: </label>
                    <input type="text" name="branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
                    <Button type="submit">Update</Button> 
                </Form>
                </FormContainer>
            </div>}

            {/* Plant section */}
            {mode === 'plant' && <div>
            <FormContainer>
                <h5>Add a Plant</h5>
                
                <Form onSubmit={submitHandler}>
                    <label htmlFor="zone">Choose a zone: </label>
                    <select id="zone" name="zone" form="zone-name" onChange={(e) => {
                        axios.get(`http://localhost:8080/data/get-branch/${e.target.value}`).then(res => setBranches(res.data))
                    }}>
                        {zones && zones.length >0 && zones.map(zone => (
                            <option key={zone.zone_id} value={zone.zone_id}>{zone.name}</option>
                        ))}
                    </select>
                    {branches && branches.length>0 && <><label htmlFor="branch">Choose a Branch: </label>
                    <select id="branch" name="branch" form="branch-name" onChange={(e) => setBranch(e.target.value)}>
                        <option value="" selected disabled hidden>Choose here</option>
                        {branches && branches.length >0 && branches.map(branch => (
                            <option key={branch.id} value={branch.id}>{branch.name}</option>
                        ))}
                    </select></>}
                    <label htmlFor="plant">Plant: </label>
                    <input type="text" name="plant" value={plant} onChange={(e) => setPlant(e.target.value)} />
                    <Button type="submit">Update</Button> 
                </Form>
                </FormContainer>
            </div>}
        </>
    )
}

export default AdminScreen