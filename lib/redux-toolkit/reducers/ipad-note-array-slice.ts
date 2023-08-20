import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ipad_note } from '@prisma/client'

interface IPadNoteArrayState {
  array: ipad_note[]
}

const initialState: IPadNoteArrayState = {
  array: [],
}

const ipadNoteArraySlice = createSlice({
  name: 'ipadNoteArray',
  initialState,
  reducers: {
    setIPadNoteArray: (state, action: PayloadAction<ipad_note[]>) => {
      state.array = action.payload
    },
  },
})

export const { setIPadNoteArray } = ipadNoteArraySlice.actions
export default ipadNoteArraySlice.reducer
