import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
	blogs:blogReducer,
	user:userReducer,
	users:usersReducer
})


const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store