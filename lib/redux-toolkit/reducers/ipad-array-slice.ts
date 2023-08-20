import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ipad } from '@prisma/client'

interface IPadArrayState {
  array: ipad[]
}

const initialState: IPadArrayState = {
  array: [],
}

const ipadArraySlice = createSlice({
  name: 'ipadArray',
  initialState,
  reducers: {
    setIPadArray: (state, action: PayloadAction<ipad[]>) => {
      state.array = action.payload
    },
  },
})

export const { setIPadArray } = ipadArraySlice.actions
export default ipadArraySlice.reducer
