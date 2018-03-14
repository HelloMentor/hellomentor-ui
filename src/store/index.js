import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import users from './users/reducer';
import chat from './chat/reducer';

const reducer = combineReducers({
  users,
  chat
});
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, middleware)

export default store;
