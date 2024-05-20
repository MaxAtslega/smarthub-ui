import { createAsyncThunk } from '@reduxjs/toolkit';
import { webSocketService } from '@/services/webSocketService';
import {clearRFIDData, detectRFID} from "@/slices/rfid.slice";
import {setInterfaces} from "@/slices/network.slice";
import {setDisplayStatus} from "@/slices/display.slice";
import NetworkInterface from "@/models/NetworkInterface";
import {useNavigate} from "react-router-dom";
import Wifi from "@/models/Wifi";
import {addOrUpdateNetwork} from "@/slices/wifi.slice";

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
    case 'WIFI_NETWORK_FOUND':
      const wifi: Wifi = message.d;
      dispatch(addOrUpdateNetwork(wifi))
      break;
    // Handle other message types
    default:
      console.warn('Unhandled WebSocket message type:', message.t);
  }
}
