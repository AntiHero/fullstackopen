
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  anecdoteReducer,
  notificationReducer,
  filterReducer,
} from '../reducers/reducers';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: notificationReducer,
  filter: filterReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));