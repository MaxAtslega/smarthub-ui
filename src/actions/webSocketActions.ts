import { createAsyncThunk } from '@reduxjs/toolkit';
import { webSocketService } from '@/services/webSocketService';
import {clearRFIDData, detectRFID} from "@/slices/rfid.slice";
import {setInterfaces, setNetworkStatus} from "@/slices/network.slice";
import {setDisplayStatus} from "@/slices/display.slice";
import NetworkInterface from "@/models/NetworkInterface";
import {NetworkStatusResponse, ScanResult} from "@/models/Wifi";
import {setScanResults} from "@/slices/wifi.slice";
import {
  addBluetoothDevice, setBluetoothConnection,
  setBluetoothDevice,
  setBluetoothDiscovery,
  setBluetoothTrust
} from "@/slices/bluetooth.slice";

export const listenToWebSocket = createAsyncThunk('webSocket/listenToWebSocket', async (_, { dispatch }) => {
  webSocketService.addEventListener('message', (message: {data: any}) => {
    handleWebSocketMessage(JSON.parse(message.data), dispatch);
  });
});

function handleWebSocketMessage(message: any, dispatch: any) {
  //   // Handle different message types and dispatch appropriate user actions
  switch (message.t) {
    case 'DISPLAY_STATUS':
      const displayStatus = message.d.status == "on";
      setTimeout(() => {
        dispatch(setDisplayStatus(displayStatus));
      }, 1000);
      break;
    case 'RFID_DETECT':
      dispatch(detectRFID(message.d))
      setTimeout(() => {
        dispatch(clearRFIDData());
      }, 5000);
      break;
    case 'NETWORK_INTERFACES':
      const interfaces: NetworkInterface[] = message.d;
      dispatch(setInterfaces(interfaces))
      break;
    case 'NETWORK_STATUS':
      const status: NetworkStatusResponse = message.d;
      dispatch(setNetworkStatus(status))
      break;

    case 'SCAN_RESULTS':
      const result: ScanResult[] = message.d;
      dispatch(setScanResults(result))
      break;

    case 'DISCOVERY_STARTED':
      dispatch(setBluetoothDiscovery({ discovering: true }));
      break;

    case 'DISCOVERY_STOPPED':
      dispatch(setBluetoothDiscovery({ discovering: false }));
      break;

    case 'DEVICE_BONDED':
    case 'DEVICE_UNBONDED':
      dispatch(setBluetoothDevice({ bonded: message.t === 'DEVICE_BONDED', device: message.d }));
      break;

    case 'DEVICE_PAIRED':
    case 'DEVICE_UNPAIRED':
      dispatch(setBluetoothDevice({ paired: message.t === 'DEVICE_PAIRED', device: message.d }));
      break;

    case 'DEVICE_TRUSTED':
    case 'DEVICE_UNTRUSTED':
      dispatch(setBluetoothTrust({ trusted: message.t === 'DEVICE_TRUSTED', device: message.d }));
      break;

    case 'DEVICE_INFO':
    case 'DEVICE_FOUND':
      dispatch(addBluetoothDevice(message.d));
      break;

    case 'DEVICE_CONNECTED':
    case 'DEVICE_DISCONNECTED':
      dispatch(setBluetoothConnection({ connected: message.t === 'DEVICE_CONNECTED', device: message.d }));
      break;
      // Handle other message types
    default:
      console.warn('Unhandled WebSocket message type:', message.t);
  }
}
