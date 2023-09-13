import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface SearchState {
  status: boolean
  text: string
}

const initialState: SearchState = {
  status: true,
  text: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.status = !state.status
    },
    setSearchToggle: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
  },
})

export const { toggleSearch, setSearchToggle, setSearchText } =
  searchSlice.actions
export default searchSlice.reducer
