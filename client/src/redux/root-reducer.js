import { combineReducers } from 'redux';
import errorReducer from './error/error.reducer';
import authReducer from './auth/auth.reducer';
import destinationsReducer from './destinations/destinations.reducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  destinations: destinationsReducer
});
