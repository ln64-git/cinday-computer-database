'use client'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface RepairState {
  status: boolean
}

const initialState: RepairState = {
  status: false,
}

export const repairSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setEditFlag: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEditFlag } = repairSlice.actions
export default repairSlice.reducer
