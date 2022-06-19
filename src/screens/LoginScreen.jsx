import React,{useState, useEffect, useInsertionEffect} from "react";
import {Form,Button} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";

const LoginScreen = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(name,password))
    }
    return(
        <>
            <h3>Login Form</h3>
            <Form onSubmit={submitHandler}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <Button type="Submit" >Sign In</Button>
            </Form>
        </>
    )
}

export default LoginScreen