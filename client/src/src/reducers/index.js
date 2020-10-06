// Node Modules
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import userInfoReducer from './userInfo/userInfoReducer';
  
// Export reducers
export default history => combineReducers({
  router: connectRouter(history),
	userInfo: userInfoReducer,
});
  