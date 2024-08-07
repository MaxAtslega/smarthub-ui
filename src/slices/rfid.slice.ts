import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserAction from "@/models/UserAction";

interface RFIDState {
  rfidData: UserAction | null;
}

const initialState: RFIDState = {
  rfidData: null,
};

const rfidSlice = createSlice({
  name: 'rfid',
  initialState,
  reducers: {
    detectRFID: (state, action: PayloadAction<UserAction>) => {
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