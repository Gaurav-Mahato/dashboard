import React, { useEffect, useState } from "react"
import {Form, Button} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {login} from "../actions/authActions"
import { useNavigate } from "react-router-dom"
const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.userLogin)
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }
    useEffect(() => {
        if(user){
            navigate("/admin-panel")
        }
    },[navigate,user])
    return (
        <>
            <h3>Login Screen</h3>
            <Form onSubmit={submitHandler}>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <Button type="submit">Login</Button>
            </Form>
        </>
    )
}

export default LoginScreen
