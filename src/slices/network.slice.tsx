import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NetworkInterface from "@/models/NetworkInterface";

interface RFIDState {
  interfaces: NetworkInterface[];
}

const initialState: RFIDState = {
  interfaces: [],
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setInterfaces: (state, action: PayloadAction<NetworkInterface[]>) => {
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