import React, { useState, useEffect} from 'react'
import {connect} from 'react-redux'
//import * as actionCreators from './store/actions/actionCreators.js'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {Card, CardDeck, CardHeader, CardTitle, CardImg, CardBody, CardFooter, Button, Container} from "shards-react"
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

function MovieList(props) {
    //local state 

    const [movies, setMovies] = useState([])

    const fetchMovies = () => {
        axios.get('http://localhost:8080/api/movies')
        .then(response => {
            console.log(response.data)
            setMovies(response.data)
        })
    }

    useEffect(() => {
        fetchMovies()
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

    return (<CardDeck>
            {movies.map(movie => {
                return (<div key={movie.id}>
                <Card style={{ maxWidth: "300px"}}>
                    <CardHeader>{movie.name}</CardHeader>
                    <CardImg src={movie.image} />
                    <CardBody>
                        <CardTitle> Director: {movie.director}</CardTitle>
                        <p>{movie.description}</p>
                    
                        <Button outline theme="info" onClick={()=> deleteMovie(movie.id)}>Delete</Button>
                        <Button outline theme="info" onClick={() => addToCart(movie.id)}>Add to Cart</Button>
                    </CardBody>    
                    <CardFooter>{movie.year}</CardFooter>
                </Card>
                
                

                </div>)
            })}
    </CardDeck>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        //onMovieDataLoaded: () => dispatch(actionCreators.movieDataFetched()),
        onIncrement: (id) => dispatch({type: 'COUNT_CART', payload: id})
    }
}

// const mapStateToProps = (state) => {
//     return {
//         movieData: state.movies
//     }
// }

export default connect(null, mapDispatchToProps)(withRouter(MovieList))