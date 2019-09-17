import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

function Cart(props){
    const [cartMovies, setCartMovies] = useState([])

    const fetchCart =() => {
        axios.get('http://localhost:8080/api/movies')
        .then(response => {
            let movies = response.data
            console.log(movies)
            setCartMovies(movies)
        })
    }
    useEffect(() => {
        fetchCart()
    }, [props.movie_id])

    let newCart = cartMovies.filter(function(el){
        return ~(props.movie_id).indexOf(el.id)
    })

    return (
        <div>
            {newCart.map(item => {
                return <div key={item.id}>
                    {item.name}</div>
            })}
            <div>Hello</div>

        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        movie_id : state.cartItems
    }
}

export default connect(mapStateToProps, null)(Cart)