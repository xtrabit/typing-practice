import { combineReducers } from 'redux';
import pressedKeys from './pressedKeysReducer';
import exercise from './exerciseReducer';
import tracker from './trackerReducer';
import savedKeys from './saveKeyReducer';
import user from './userReducer';
import data from './exerciseDataReducer';

export default combineReducers({
  pressedKeys,
  exercise,
  tracker,
  savedKeys,
  user,
  data
});
