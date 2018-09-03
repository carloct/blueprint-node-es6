import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import customReducers from './reducers';

const reducers = combineReducers({
  ...customReducers
});

const middlewares = [thunkMiddleware];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
