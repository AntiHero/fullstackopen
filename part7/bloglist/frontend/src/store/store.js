import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import blogsReducer from '../reducers/blogsReducer';
import notificationReducer from '../reducers/notificationReducer';
import userReducer from '../reducers/userReducer';

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  user: userReducer,
});

const store = createStore(reducer, compose(applyMiddleware(thunk)));

export default store;
