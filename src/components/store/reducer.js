
const initialState = {
    movies: [],
    counter: 0,
    cartItems: [],
    isAuthenticated: false
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
        case 'ON_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: action.token ? true: false
            }
        case 'SIGN_OUT':
            return {
                ...state,
                isAuthenticated: false

            }
        default:
            return {
                ...state
            }
          
    }
   
}

export default reducer