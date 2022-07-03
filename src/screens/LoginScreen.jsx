import React, { useEffect, useState } from "react"
import {Form, Button} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {login} from "../actions/authActions"
import { useNavigate } from "react-router-dom"
const LoginScreen = ({mode}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user,error} = useSelector(state => state.userLogin)
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password,mode))
    }
    useEffect(() => {
        if(user){
            navigate(`/${mode}`)
        }
    },[navigate,user])
    return (
        <>
            {error && <p>{error.message}</p>}
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
