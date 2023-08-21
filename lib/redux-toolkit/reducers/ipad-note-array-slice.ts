import { redux_ipad_note } from '@/util/types/redux-ipad-note'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'


interface IPadNoteArrayState {
  array: redux_ipad_note[]
}

const initialState: IPadNoteArrayState = {
  array: [],
}

const ipadNoteArraySlice = createSlice({
  name: 'ipadNoteArray',
  initialState,
  reducers: {
    setIPadNoteArray: (state, action: PayloadAction<redux_ipad_note[]>) => {
      state.array = action.payload
    },
  },
})

export const { setIPadNoteArray } = ipadNoteArraySlice.actions
export default ipadNoteArraySlice.reducer
