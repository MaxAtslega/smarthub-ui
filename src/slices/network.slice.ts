import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NetworkInterface from "@/models/NetworkInterface";
import {NetworkStatusResponse} from "@/models/Wifi";

interface NetworkState {
  interfaces: NetworkInterface[];
  status: NetworkStatusResponse
}

const initialState: NetworkState = {
  interfaces: [],
  status: {status: "DEACTIVATED"},
};

const interfacesChanged = (oldInterfaces: NetworkInterface[], newInterfaces: NetworkInterface[]): boolean => {
  const oldEth = oldInterfaces.find(intf => intf.name === 'eth0');
  const newEth = newInterfaces.find(intf => intf.name === 'eth0');
  const oldWlan = oldInterfaces.find(intf => intf.name === 'wlan0');
  const newWlan = newInterfaces.find(intf => intf.name === 'wlan0');

  return JSON.stringify(oldEth) !== JSON.stringify(newEth) || JSON.stringify(oldWlan) !== JSON.stringify(newWlan);
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setInterfaces: (state, action: PayloadAction<NetworkInterface[]>) => {
      if (interfacesChanged(state.interfaces, action.payload)) {
        state.interfaces = action.payload;
      }
    },
    clearInterfaces: (state) => {
      state.interfaces = [];
    },
    setNetworkStatus(state, action: PayloadAction<NetworkStatusResponse>) {
      if (state.status.status != action.payload.status || state.status.ssid != action.payload.ssid) {
        state.status = action.payload;
      }
    }
  },
});

export const { setInterfaces, clearInterfaces, setNetworkStatus } = networkSlice.actions;
export const getInterfacesData = (state: { network: NetworkState }) => state.network.interfaces;
export const getEthernetInterface = (state: { network: NetworkState }) => state.network.interfaces.find(intf => intf.name === 'eth0');
export const getWlanInterface = (state: { network: NetworkState }) => state.network.interfaces.find(intf => intf.name === 'wlan0');

export const getNetworkStatus = (state: { network: NetworkState }) => state.network.status;

export default networkSlice.reducer;