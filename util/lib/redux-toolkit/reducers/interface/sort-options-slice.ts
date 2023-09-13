import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortOptionsState {
  text: string; // Assuming text is a string value
}

const initialState: SortOptionsState = {
  text: 'date-modified', // Initialize with a default value
};

const sortOptionsSlice = createSlice({
  name: 'sortOptions',
  initialState,
  reducers: {
    setSortOption: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { setSortOption } = sortOptionsSlice.actions;
export default sortOptionsSlice.reducer;
