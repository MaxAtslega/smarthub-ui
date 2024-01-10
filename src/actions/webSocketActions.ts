import { createAsyncThunk } from '@reduxjs/toolkit';
import { webSocketService } from '@/services/webSocketService';
import { addUser, removeUser, updateUser, selectUser } from '@/slices/userSlice';
import User from "@/models/User";
import {clearRFIDData, detectRFID} from "@/slices/rfidSlice";

export const listenToWebSocket = createAsyncThunk('webSocket/listenToWebSocket', async (_, { dispatch }) => {
  webSocketService.addEventListener('message', (message: {data: any}) => {
    handleWebSocketMessage(JSON.parse(message.data), dispatch);
  });
});

function handleWebSocketMessage(message: any, dispatch: any) {
  // Handle different message types and dispatch appropriate user actions
  switch (message.t) {
    case 'USERS':
      const users: User[] = message.d;
      users.forEach(user => {
        dispatch(addUser(user));
      })
      break;
    case 'RFID_DETECT':
      dispatch(detectRFID(message.d))
      setTimeout(() => {
        dispatch(clearRFIDData());
      }, 5000);
      break;
    // Handle other message types
    default:
      console.warn('Unhandled WebSocket message type:', message.t);
  }
}
