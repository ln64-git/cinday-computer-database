import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { laptop } from '@prisma/client'

interface LaptopArrayState {
  array: laptop[]
}

const initialState: LaptopArrayState = {
  array: [],
}

const laptopArraySlice = createSlice({
  name: 'laptopArray',
  initialState,
  reducers: {
    setLaptopArray: (state, action: PayloadAction<laptop[]>) => {
      state.array = action.payload
    },
  },
})

export const { setLaptopArray } = laptopArraySlice.actions
export default laptopArraySlice.reducer
