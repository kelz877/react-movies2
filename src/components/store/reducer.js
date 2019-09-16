const initialState = {
    movies: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'MOVIE_DATA_LOADED':
            return {
                ...state,
                movies: action.payload
            }
    }
    return state
}

export default reducer