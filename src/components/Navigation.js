import React from 'react'
import {NavLink} from 'react-router-dom'

function Navigation(){
    return (
        <div>
            <NavLink to='/add-movie'>Add Movie</NavLink>
            <NavLink to='/movies'>View Movies</NavLink>
            <NavLink to='cart'>Cart</NavLink>
        </div>
    )
}

export default Navigation