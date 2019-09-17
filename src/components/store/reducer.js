const initialState = {
    movies: [],
    counter: 0,
    cartItems: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'MOVIE_DATA_LOADED':
            return {
                ...state,
                movies: action.payload
            }
        case 'COUNT_CART':
            return {
                ...state,
                counter: state.counter + 1,
                cartItems: state.cartItems.concat(action.payload)
            }
        default:
            return {
                ...state
            }
          
    }
   
}

export default reducer