import { combineReducers } from 'redux';

import authReducer from './authReducer';
import remindersReducer from './remindersReducer';

export default combineReducers({
  auth: authReducer,
  reminders: remindersReducer
});