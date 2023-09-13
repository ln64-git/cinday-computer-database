import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterOptionsState {
  array: string[];
}

const initialState: FilterOptionsState = {
  array: ['name', 'internal_model_id', 'external_model_id', 'serial_number'],
};

const filterOptionsSlice = createSlice({
  name: 'filterOptions',
  initialState,
  reducers: {
    setFilterOptions: (state, action: PayloadAction<string[]>) => {
      state.array = [...action.payload];
    },
    toggleFilterOption: (state, action: PayloadAction<string>) => {
      const index = state.array.indexOf(action.payload);
      if (index !== -1) {
        console.log(`Removing option: ${action.payload}`);
        state.array = state.array.filter(option => option !== action.payload);
      } else {
        console.log(`Adding option: ${action.payload}`);
        state.array = [...state.array, action.payload];
      }
    },
  },
});

export const { setFilterOptions, toggleFilterOption } = filterOptionsSlice.actions;
export default filterOptionsSlice.reducer;
