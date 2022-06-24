import React,{useState,useEffect} from "react";
import {Form,Button} from "react-bootstrap"
import { useDispatch,useSelector } from "react-redux";
import { register } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
    const navigate = useNavigate()
    const {user} = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email,setEmail] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(name,password,email))
    }
    useEffect(() => {
        if(user){
            navigate('/login')
        }
    },[user,navigate])
    return(
        <>
            <h3>Register Form</h3>
            <Form onSubmit={submitHandler}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <Button type="submit">Register</Button>
            </Form>
        </>
    )
}

export default RegisterScreen