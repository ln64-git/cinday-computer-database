'use client'

import { configureStore } from '@reduxjs/toolkit'
import deviceReducer from './reducers/interface/device-slice'
import iPadArrayReducer from './reducers/ipad-array-slice'
import iPadNoteArrayReducer from './reducers/ipad-note-array-slice'
import laptopArrayReducer from './reducers/laptop-array-slice'
import laptopNoteArrayReducer from './reducers/laptop-note-array-slice'
import pageReducer from './reducers/interface/page-slice'
import repairReducer from './reducers/interface/repair-slice'
import searchReducer from './reducers/interface/search-slice'

export const store = configureStore({
  reducer: {
    page: pageReducer,
    repair: repairReducer,
    device: deviceReducer,
    search: searchReducer,
    iPadArray: iPadArrayReducer,
    iPadNoteArray: iPadNoteArrayReducer,
    laptopArray: laptopArrayReducer,
    laptopNoteArray: laptopNoteArrayReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
