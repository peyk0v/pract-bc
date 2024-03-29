import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
	notification: notificationReducer,
	anecdotes: anecdoteReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
