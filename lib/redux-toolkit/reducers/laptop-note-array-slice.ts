import { redux_laptop_note } from '@/util/types/redux-laptop-note'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface LaptopNoteArrayState {
  array: redux_laptop_note[]
}

const initialState: LaptopNoteArrayState = {
  array: [],
}

const laptopNoteArraySlice = createSlice({
  name: 'laptopNoteArray',
  initialState,
  reducers: {
    setLaptopNoteArray: (state, action: PayloadAction<redux_laptop_note[]>) => {
      state.array = action.payload
    },
  },
})

export const { setLaptopNoteArray } = laptopNoteArraySlice.actions
export default laptopNoteArraySlice.reducer
