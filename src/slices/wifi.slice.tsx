import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import WifiNetwork from "@/models/Wifi";

interface WifiState {
  networks: WifiNetwork[];
}

const initialState: WifiState = {
  networks: [],
};

const wifiSlice = createSlice({
  name: 'wifi',
  initialState,
  reducers: {
    addOrUpdateNetwork: (state, action: PayloadAction<WifiNetwork>) => {
      const index = state.networks.findIndex(network => network.ssid === action.payload.ssid);
      if (index !== -1) {
        // Replace the existing network entry
        const existingNetwork = state.networks[index];
        if (parseInt(action.payload.signal_level, 10) > parseInt(existingNetwork.signal_level, 10)) {
          // Update the network with the stronger signal
          state.networks[index] = action.payload;
        }
      } else {
        // Add the new network entry
        state.networks.push(action.payload);
      }
    },
    clearNetworks: (state) => {
      state.networks = [];
    },
  },
});

export const { addOrUpdateNetwork, clearNetworks } = wifiSlice.actions;
export const selectWifiNetworks = (state: { wifi: WifiState }) => state.wifi.networks;

export default wifiSlice.reducer;