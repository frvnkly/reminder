import axios from 'axios';

import { FETCH_REMINDERS } from './types';

export const fetchReminders = () => async dispatch => {
  const res = await axios.get('/api/reminders');
  dispatch({ type: FETCH_REMINDERS, payload: res.data });
};