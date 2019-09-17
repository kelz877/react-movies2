import React, { useEffect} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from './store/actions/actionCreators.js'
import {withRouter} from 'react-router-dom'
//import axios from 'axios'

function MovieList(props) {
    //local state 

    //const [name, setName] = useState('')

    useEffect(() => {
        props.onMovieDataLoaded()
    }, [])

    const deleteMovie = (id) => {
        fetch('http://localhost:8080/api/delete-movie', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then(response => {
            props.history.push("/movies")
        })
    }

    const addToCart = (id) => {
        props.onIncrement(id)
        console.log(id)
    }

    return <div>
            {props.movieData.map(movie => {
                return (<div key={movie.id}>{movie.name}
                <button onClick={()=> deleteMovie(movie.id)}>Delete</button>
                <button onClick={() => addToCart(movie.id)}>Add to Cart</button>
                </div>)
            })}
    </div>
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMovieDataLoaded: () => dispatch(actionCreators.movieDataFetched()),
        onIncrement: (id) => dispatch({type: 'COUNT_CART', payload: id})
    }
}

const mapStateToProps = (state) => {
    return {
        movieData: state.movies
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieList))