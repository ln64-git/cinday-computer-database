import { redux_laptop } from '@/util/types/redux.laptop'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'


interface LaptopArrayState {
  array: redux_laptop[]
}

const initialState: LaptopArrayState = {
  array: [],
}

const laptopArraySlice = createSlice({
  name: 'laptopArray',
  initialState,
  reducers: {
    setLaptopArray: (state, action: PayloadAction<redux_laptop[]>) => {
      state.array = action.payload
    },
  },
})

export const { setLaptopArray } = laptopArraySlice.actions
export default laptopArraySlice.reducer
