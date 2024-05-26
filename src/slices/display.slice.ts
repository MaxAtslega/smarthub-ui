import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DisplayState {
  status: boolean
}

const initialState: DisplayState = {
  status: true,
};

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setDisplayStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const { setDisplayStatus } = displaySlice.actions;
export const selectDisplayStatus = (state: { display: DisplayState }) => state.display.status;

export default displaySlice.reducer;