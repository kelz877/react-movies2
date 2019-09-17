import React, {useState} from 'react'
import axios from 'axios'
import {Form, FormInput, FormGroup, Button, Container} from "shards-react"
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


function Register(props) {
    const [user, setUser] = useState({username: '', password: ''})

    const handleRegister = () => {
        axios.post('http://localhost:8080/register', {
            username: user.username,
            password: user.password
        }).then(response => {
            props.history.push('/login')
        })
    }
    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    } 
    return (
        <Container>
            <h1>Register</h1>
            <Form >
                <FormGroup>
                    <label >Username</label>
                    <FormInput id="#username" name="username" onChange={(e) => handleTextChange(e)} placeholder="Username" />
                </FormGroup>
                <FormGroup>
                    <label >Password</label>
                    <FormInput type="password" name="password" placeholder="Password" onChange={(e) => handleTextChange(e)} />
                </FormGroup>
                <Button outline theme="info" onClick={() => handleRegister()}>Register</Button>
            </Form>

            
        </Container>
    )


}

export default Register
