import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { User, Register, ForgotPassword, ResetPassword } from '../reducers/userReducer'

const reducer = combineReducers({
    User,
    Register,
    ForgotPassword,
    ResetPassword
})

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}

const initialState = { 
    User: { user }
 } 

const middlewares = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store