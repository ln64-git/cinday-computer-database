import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or any other storage
import { combineReducers } from 'redux'; // Import combineReducers
import deviceReducer from './reducers/interface/device-slice';
import iPadArrayReducer from './reducers/ipad-array-slice';
import iPadNoteArrayReducer from './reducers/ipad-note-array-slice';
import laptopArrayReducer from './reducers/laptop-array-slice';
import laptopNoteArrayReducer from './reducers/laptop-note-array-slice';
import userDeviceReducer from './reducers/user-device-slice';
import userNoteReducer from './reducers/user-note-slice';
import pageReducer from './reducers/interface/page-slice';
import repairReducer from './reducers/interface/repair-slice';
import searchReducer from './reducers/interface/search-slice';
import editReducer from './reducers/interface/edit-flag-slice';

const persistConfig = {
  key: 'root', // key for the localStorage
  storage,
  devTools: true, // This enables Redux DevTools
};

// Use combineReducers to create the rootReducer
const rootReducer = combineReducers({
  page: pageReducer,
  edit: editReducer,
  repair: repairReducer,
  device: deviceReducer,
  search: searchReducer,
  iPadArray: iPadArrayReducer,
  iPadNoteArray: iPadNoteArrayReducer,
  laptopArray: laptopArrayReducer,
  laptopNoteArray: laptopNoteArrayReducer,
  userDevice: userDeviceReducer,
  userNote: userNoteReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);
