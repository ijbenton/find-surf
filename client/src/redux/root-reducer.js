import { combineReducers } from 'redux';
import errorReducer from './error/error.reducer';
import authReducer from './auth/auth.reducer';
import destinationsReducer from './destinations/destinations.reducer';
import spotsReducer from './spots/spots.reducer';
import fileReducer from './file/file.reducer';
import searchReducer from './search/search.reducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  destinations: destinationsReducer,
  spots: spotsReducer,
  file: fileReducer,
  search: searchReducer
});
