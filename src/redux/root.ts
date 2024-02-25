import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';

const rootReducer = combineReducers({
  authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
