import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RFIDState {
  rfidData: number[] | null;
}

const initialState: RFIDState = {
  rfidData: null,
};

const rfidSlice = createSlice({
  name: 'rfid',
  initialState,
  reducers: {
    detectRFID: (state, action: PayloadAction<number[]>) => {
      state.rfidData = action.payload;
    },
    clearRFIDData: (state) => {
      state.rfidData = null;
    },
  },
});

export const { detectRFID, clearRFIDData } = rfidSlice.actions;
export const selectRFIDData = (state: { rfid: RFIDState }) => state.rfid.rfidData;

export default rfidSlice.reducer;