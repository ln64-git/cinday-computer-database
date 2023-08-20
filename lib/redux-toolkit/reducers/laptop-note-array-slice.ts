import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { laptop_note } from '@prisma/client'

interface LaptopNoteArrayState {
  array: laptop_note[]
}

const initialState: LaptopNoteArrayState = {
  array: [],
}

const laptopNoteArraySlice = createSlice({
  name: 'laptopNoteArray',
  initialState,
  reducers: {
    setLaptopNoteArray: (state, action: PayloadAction<laptop_note[]>) => {
      state.array = action.payload
    },
  },
})

export const { setLaptopNoteArray } = laptopNoteArraySlice.actions
export default laptopNoteArraySlice.reducer
