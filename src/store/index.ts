import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/slices/userSlice";
import rfidSlice from "@/slices/rfidSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    rfid: rfidSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})