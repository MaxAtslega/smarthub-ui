import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/slices/userSlice";
import rfidSlice from "@/slices/rfidSlice";
import networkSlice from "@/slices/networkSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    rfid: rfidSlice,
    network: networkSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})