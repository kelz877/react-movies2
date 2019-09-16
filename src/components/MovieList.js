import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from './store/actions/actionCreators.js'

function MovieList(props) {
    //local state 
    const [counter, setCounter] = useState(0)
    const [name, setName] = useState('')

    useEffect(() => {
        props.onMovieDataLoaded()
    }, [])

    return <div>
            {props.movieData.map(movie => {
                return <div>{movie.name}
                </div>
            })}
    </div>
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMovieDataLoaded: () => dispatch(actionCreators.movieDataFetched())
    }
}

const mapStateToProps = (state) => {
    return {
        movieData: state.movies
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList)