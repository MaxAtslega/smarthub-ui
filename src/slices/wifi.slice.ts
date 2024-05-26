import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {NetworkStatusResponse, ScanResult} from "@/models/Wifi";

interface WifiState {
  activated: boolean;
  results: ScanResult[];
}

const initialState: WifiState = {
  activated: true,
  results: []
};

const wifiSlice = createSlice({
  name: 'wifi',
  initialState,
  reducers: {
    activateWlan(state) {
      state.activated = true;
    },
    deactivateWlan(state) {
      state.activated = false;
    },
    setScanResults(state, action: PayloadAction<ScanResult[]>){
      state.results = action.payload;
    }
  },
});

export const { activateWlan, deactivateWlan, setScanResults } = wifiSlice.actions;
export const isWlanActivated = (state: { wifi: WifiState }) => state.wifi.activated;
export const getScanResults = (state: { wifi: WifiState }) => state.wifi.results;

export default wifiSlice.reducer;
