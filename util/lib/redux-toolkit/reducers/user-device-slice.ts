// user-device-slice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { redux_device } from '@/util/types/redux-device';

interface DeviceState {
  state: redux_device | null;
}

const initialState: DeviceState = {
  state: null,
};

const userDeviceSlice = createSlice({
  name: 'userDevice',
  initialState,
  reducers: {
    setUserDevice: (state, action: PayloadAction<redux_device>) => {
      state.state = action.payload;
    },
    resetUserDevice: (state) => {
      state.state = null;
    }
  },
});

export const { setUserDevice, resetUserDevice } = userDeviceSlice.actions;
export default userDeviceSlice.reducer;
