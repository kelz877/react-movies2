import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Nav, NavItem, Navbar} from "shards-react"

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

function Navigation(props){

    const handleSignOut = () => {
        //remove the json webtoken from local storage
        localStorage.removeItem("jsonwebtoken")
        //update global state to set isAuthenticated = false
        props.onSignOut();
        props.history.push('/login')
    }


    return (
        
        <Nav fill>
            <NavItem>
                <NavLink to='/login'>Login</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to='/register'>Register</NavLink>
            </NavItem>
            <NavItem>
                {props.authenticated ? <NavLink to='/add-movie'>Add Movie</NavLink> : null}
            </NavItem>
            <NavItem>
                {props.authenticated ? <NavLink to='/movies'>View Movies</NavLink> : null}
            </NavItem>
            <NavItem>
                {props.authenticated ? <NavLink to='cart'>Cart {props.count}</NavLink> : null}
            </NavItem>
            <NavItem>
                {props.authenticated ? <li><a href="#" onClick={() => handleSignOut()}>Sign Out</a></li> : null}
            </NavItem>
        </Nav>
        
    )
}

const mapStateToProps = (state) => {
    return {
        count: state.counter,
        authenticated: state.isAuthenticated //isAuthenticated coming from redux global state <-- props.authenticated
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: () => dispatch({type: "SIGN_OUT"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))