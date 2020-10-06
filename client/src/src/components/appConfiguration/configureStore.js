import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import createRootReducer from '../../reducers';

let middleware = [thunk];
if (process.env.NODE_ENV === 'Dev') {
  middleware = [...middleware, logger];
}

export const history = createBrowserHistory();

const store = configureStore({
  reducer: createRootReducer(history),
  preloadedState: {},
  middleware,
});

export default store;
