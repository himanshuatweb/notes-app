import { configureStore ,combineReducers } from  '@reduxjs/toolkit';

import taskReducer from '../features/taskSlice';
import authReducer from '../features/auth/authSlice'

const rootReducer = combineReducers({task: taskReducer, auth: authReducer})


export const store = configureStore({
    reducer:rootReducer
})