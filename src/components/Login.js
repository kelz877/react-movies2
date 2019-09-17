import React, {useState} from 'react';
import axios from 'axios'
import {setAuthenticationHeader} from './utils/authenticate'
import {connect} from 'react-redux'
import {Form, FormInput, FormGroup, Button, Container} from "shards-react"
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


function Login(props) {
    const [user, setUser] = useState({username: '', password: ''})

    const handleLogin = () => {
        //perform a login request to the server
        axios.post('http://localhost:8080/login', {
            username: user.username,
            password: user.password
        }).then(response => {
            const token = response.data.token
            //save token in local storage
            localStorage.setItem('jsonwebtoken', token)
            //set default axios header
            setAuthenticationHeader(token)
            //change redux  state to isAuthenticated true
            props.onAuthenticated(token)
            console.log(response.data)
        })
        .then(response => {
            props.history.push('/movies')
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
            <h1>Login</h1>
            <Form >
                <FormGroup>
                    <label >Username</label>
                    <FormInput id="#username" name="username" onChange={(e) => handleTextChange(e)} placeholder="Username" />
                </FormGroup>
                <FormGroup>
                    <label >Password</label>
                    <FormInput type="password" name="password" placeholder="Password" onChange={(e) => handleTextChange(e)} />
                </FormGroup>
                <Button outline theme="info" onClick={() => handleLogin()}>Login</Button>
            </Form>
            {/* <input type="text" name="username" onChange={(e) => handleTextChange(e)} />
            <input type="password" name="password" onChange={(e) => handleTextChange(e)} /> */}
            
        </Container>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticated: (token) => dispatch({type: "ON_AUTHENTICATED", token: token})
    }
}

export default connect(null, mapDispatchToProps)(Login)