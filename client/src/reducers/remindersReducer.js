import * as actionTypes from '../actions/types';

export default (state=[], action) => {
  switch (action.type) {
    case actionTypes.FETCH_REMINDERS:
      return action.payload;
    default:
      return state;
  }
};