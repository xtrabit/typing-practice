import { combineReducers } from 'redux';
import pressedKeys from './pressedKeysReducer';
import exercise from './exerciseReducer';
import tracker from './trackerReducer';
import keys from './saveKeyReducer';

export default combineReducers({
  pressedKeys,
  exercise,
  tracker,
  keys
});
