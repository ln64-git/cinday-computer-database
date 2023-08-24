import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface PageVisibleState {
  status: boolean
}

const initialState: PageVisibleState = {
  status: false,
}

const pageVisibleSlice = createSlice({
  name: 'pageVisible',
  initialState,
  reducers: {
    setPageVisible: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload
    },
    togglePageVisibility: (state) => {
      state.status = !state.status
    },
  },
})

export const { setPageVisible, togglePageVisibility } = pageVisibleSlice.actions
export default pageVisibleSlice.reducer
