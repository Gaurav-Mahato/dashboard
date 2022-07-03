import React,{useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import {useNavigate} from "react-router-dom"
import {Form, Button} from "react-bootstrap"
import axios from "axios";
import { logout } from "../actions/authActions";

const AdminScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.userLogin)
    const [zone,setZone] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        const config = {
            headers:{
                'Content-Type': "application/json",
                Authorization: `${user.token}`
            }
        }
        axios.post("http://localhost:8080/admin/update",{
            zone
        },config)
    }
    useEffect(() => {
        if(user === undefined || user === {}){
            navigate("/admin-register")
        }
    },[navigate,user])
    const logoutHandler = (e) => {
        e.preventDefault()
        dispatch(logout())
    }
    return(
        <>
            <h3>Admin Panel</h3>
            <Form onSubmit={submitHandler}>
                <label htmlFor="zone">Zone: </label>
                <input type="text" name="zone" value={zone} onChange={(e) => setZone(e.target.value)}></input>
                <Button type="submit">Update</Button>
            </Form>
            <Button onClick={logoutHandler}>Log out</Button>
        </>
    )
}

export default AdminScreen