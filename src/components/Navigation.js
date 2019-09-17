import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

function Navigation(props){
    return (
        <div>
            <NavLink to='/add-movie'>Add Movie</NavLink>
            <NavLink to='/movies'>View Movies</NavLink>
            <NavLink to='cart'>Cart {props.count}</NavLink>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        count: state.counter
    }
}

export default connect(mapStateToProps, null)(Navigation)