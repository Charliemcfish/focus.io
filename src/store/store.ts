// Importing the necessary reducers
import todoListReducer from './slice/todoListSlice';
import rainReducer from './slice/rainSlice';
import moodReducer from './slice/moodSlice';
import modeReducer from './slice/modeSlice';
import changeVolumeReducer from './slice/changeVolumeSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Defining the root state type
export type RootState = ReturnType<typeof rootReducer>;

// Creating custom hooks for useDispatch and useSelector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Combining individual reducers into a rootReducer
const rootReducer = combineReducers({
    todoList: todoListReducer,
    rain: rainReducer,
    mood: moodReducer,
    mode: modeReducer,
    volume: changeVolumeReducer,
});

// Configuring the Redux store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,  // Disabling serializable check for non-serializable data
    }),
});

// Exporting the configured Redux store
export default store;
