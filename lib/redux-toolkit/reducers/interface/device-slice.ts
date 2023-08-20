import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DeviceState {
  isIPad: boolean
}

const initialState: DeviceState = {
  isIPad: true,
}

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setIsIPad: (state, action: PayloadAction<boolean>) => {
      state.isIPad = action.payload
    },
  },
})

export const { setIsIPad } = deviceSlice.actions
export default deviceSlice.reducer
