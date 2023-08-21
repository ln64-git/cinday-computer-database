import { redux_ipad } from '@/util/types/redux-ipad'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'


interface IPadArrayState {
  array: redux_ipad[]
}

const initialState: IPadArrayState = {
  array: [],
}

const ipadArraySlice = createSlice({
  name: 'ipadArray',
  initialState,
  reducers: {
    setIPadArray: (state, action: PayloadAction<redux_ipad[]>) => {
      state.array = action.payload
    },
  },
})

export const { setIPadArray } = ipadArraySlice.actions
export default ipadArraySlice.reducer
