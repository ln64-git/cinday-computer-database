import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { redux_ipad_note } from '@/util/types/redux-ipad-note';
import { redux_laptop_note } from '@/util/types/redux-laptop-note';

interface NoteState {
  state: redux_ipad_note | redux_laptop_note | null;
}

const initialState: NoteState = {
  state: null,
};

const userNoteSlice = createSlice({
  name: 'userNote',
  initialState,
  reducers: {
    setUserNote: (state, action: PayloadAction<redux_ipad_note | redux_laptop_note>) => {
      state.state = action.payload;
    },
  },
});

export const { setUserNote } = userNoteSlice.actions;
export default userNoteSlice.reducer;