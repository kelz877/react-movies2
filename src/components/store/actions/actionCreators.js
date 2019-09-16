import * as actionTypes from './actionTypes'

export const movieDataFetched = () => {
    return dispatch => {
        //fetch all of the movies from the db
        fetch('http://localhost:8080/movies')
        .then(response => response.json())
        .then(json => {
            dispatch({type: actionTypes.MOVIE_DATA_LOADED, payload: json})
        })
        }
}