import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

function Navigation(props){

    const handleSignOut = () => {
        //remove the json webtoken from local storage
        localStorage.removeItem("jsonwebtoken")
        //update global state to set isAuthenticated = false
        props.onSignOut()
    }


    return (
        <div>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
            {props.authenticated ? <NavLink to='/add-movie'>Add Movie</NavLink> : null}
            {props.authenticated ? <NavLink to='/movies'>View Movies</NavLink> : null}
            {props.authenticated ? <NavLink to='cart'>Cart {props.count}</NavLink> : null}
            {props.authenticated ? <li><a href="#" onClick={() => handleSignOut()}>Sign Out</a></li> : null}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)