import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "@/slices/user.slice";
import rfidSlice from "@/slices/rfid.slice";
import networkSlice from "@/slices/network.slice";
import displaySlice from "@/slices/display.slice";
import { commonApi } from './common.api';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {weatherApi} from "@/api/weather.api";
import wifiSlice from "@/slices/wifi.slice";
import bluetoothSlice from "@/slices/bluetooth.slice";
import timerSlice from "@/slices/timer.slice";
import {radioApi} from "@/api/radio.api";
import volumeSlice from "@/slices/volume.slice";

const rootReducer = combineReducers({
  [commonApi.reducerPath]: commonApi.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
  [radioApi.reducerPath]: radioApi.reducer,
  user: userSlice,
  rfid: rfidSlice,
  network: networkSlice,
  display: displaySlice,
  wifi: wifiSlice,
  bluetooth: bluetoothSlice,
  timer: timerSlice,
  volume: volumeSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(commonApi.middleware).concat(radioApi.middleware).concat(weatherApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;