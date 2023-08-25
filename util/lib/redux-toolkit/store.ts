import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or any other storage
import { combineReducers } from 'redux'; // Import combineReducers
import deviceReducer from './reducers/interface/device-slice';
import iPadArrayReducer from './reducers/ipad-array-slice';
import iPadNoteArrayReducer from './reducers/ipad-note-array-slice';
import laptopArrayReducer from './reducers/laptop-array-slice';
import laptopNoteArrayReducer from './reducers/laptop-note-array-slice';
import pageReducer from './reducers/interface/page-slice';
import repairReducer from './reducers/interface/repair-slice';
import searchReducer from './reducers/interface/search-slice';

const persistConfig = {
  key: 'root', // key for the localStorage
  storage,
  // Add any other configuration options if needed
};

// Use combineReducers to create the rootReducer
const rootReducer = combineReducers({
  page: pageReducer,
  repair: repairReducer,
  device: deviceReducer,
  search: searchReducer,
  iPadArray: iPadArrayReducer,
  iPadNoteArray: iPadNoteArrayReducer,
  laptopArray: laptopArrayReducer,
  laptopNoteArray: laptopNoteArrayReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
