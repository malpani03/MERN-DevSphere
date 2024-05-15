// store.js
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger'; // Import the logger middleware
import rootReducer from './rootReducer';

// Create the Redux store with middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger) // Compose multiple middlewares
);

export default store;
