import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import {BaseLayout} from './components/BaseLayout'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import MovieList from './components/MovieList';
import {Provider} from 'react-redux'; 
import thunk from 'redux-thunk';
import {compose, applyMiddleware, createStore} from 'redux'
import reducer from './components/store/reducer.js'
import AddMovie from './components/AddMovie';
import Login from './components/Login'
import Cart from './components/Cart'
import {setAuthenticationHeader} from './components/utils/authenticate'
import requireAuth from './components/requireAuth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
))

let token = localStorage.getItem('jsonwebtoken')
setAuthenticationHeader(token)

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <BaseLayout>
                <Switch>
                    <Route path="/movies" component={requireAuth(MovieList)} />
                    <Route path='/add-movie' component={requireAuth(AddMovie)} />
                    <Route path='/login' component={Login} />
                    <Route path='/cart' component={requireAuth(Cart)} />
                </Switch>
            </BaseLayout>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
