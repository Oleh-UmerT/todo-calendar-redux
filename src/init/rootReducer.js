import { combineReducers } from 'redux';

import { todoReducer as todo } from '../todo/reducer';

export const rootReducer = combineReducers({
  todo
});
