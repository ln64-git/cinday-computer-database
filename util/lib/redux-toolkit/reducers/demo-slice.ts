'use client'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UserState {
  status: boolean
}

const initialState: UserState = {
  status: false,
}

export const userSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    setDemoStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDemoStatus } = userSlice.actions

export default userSlice.reducer
