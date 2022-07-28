import React, { useEffect, useState } from "react"
import {Form, Button} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {login} from "../actions/authActions"
import { useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
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
            <div>
            {error && <Message variant="danger" message={error.message}></Message>}
            <h3 className="text-center">Login Screen</h3>
            <FormContainer>
            <Form onSubmit={submitHandler}>
               <Form.Group controlId="email">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"></Form.Control>
               </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" style={{marginTop: '20px'}}>Login</Button>
            </Form>
            </FormContainer>
            </div>
        </>
    )
}

export default LoginScreen
