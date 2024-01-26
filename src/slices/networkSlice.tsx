import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RFIDState {
  interfaces: any[];
}

const initialState: RFIDState = {
  interfaces: [],
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setInterfaces: (state, action: PayloadAction<number[]>) => {
      state.interfaces = action.payload;
    },
    clearInterfaces: (state) => {
      state.interfaces = [];
    },
  },
});

export const { setInterfaces, clearInterfaces } = networkSlice.actions;
export const getInterfacesData = (state: { network: RFIDState }) => state.network.interfaces;

export default networkSlice.reducer;