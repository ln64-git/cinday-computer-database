import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { redux_ipad } from '@/util/types/redux-ipad';
import { redux_laptop } from '@/util/types/redux.laptop';

interface DeviceState {
  state: redux_ipad | redux_laptop | null;
}

const initialState: DeviceState = {
  state: null,
};

const userDeviceSlice = createSlice({
  name: 'userDevice',
  initialState,
  reducers: {
    setUserDevice: (state, action: PayloadAction<redux_ipad | redux_laptop>) => {
      state.state = action.payload; 
    },
  },
});

export const { setUserDevice } = userDeviceSlice.actions;
export default userDeviceSlice.reducer;