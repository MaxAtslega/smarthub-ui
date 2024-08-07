import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BluetoothDevice } from '@/models/Bluetooth';

interface BluetoothState {
    discovering: boolean;
    devices: BluetoothDevice[];
}

const initialState: BluetoothState = {
    discovering: false,
    devices: [],
};

const bluetoothSlice = createSlice({
    name: 'bluetooth',
    initialState,
    reducers: {
        setBluetoothDiscovery(state, action: PayloadAction<{ discovering: boolean }>) {
            state.discovering = action.payload.discovering;
        },
        setBluetoothDevice(state, action: PayloadAction<{ bonded?: boolean; paired?: boolean; trusted?: boolean; connected?: boolean; device: BluetoothDevice }>) {
            const { device, bonded, paired, trusted, connected } = action.payload;
            const existingDevice = state.devices.find(d => d.address === device.address);

            if (existingDevice) {
                if (bonded !== undefined) existingDevice.paired = bonded;
                if (paired !== undefined) existingDevice.paired = paired;
                if (trusted !== undefined) existingDevice.trusted = trusted;
                if (connected !== undefined) existingDevice.connected = connected;
            } else {
                state.devices.push(device);
            }
        },
        addBluetoothDevice(state, action: PayloadAction<BluetoothDevice>) {
            const existingDevice = state.devices.find(d => d.address === action.payload.address);
            if (!existingDevice) {
                state.devices.push(action.payload);
            }
        },
        setBluetoothConnection(state, action: PayloadAction<{ connected: boolean; device: BluetoothDevice }>) {
            const existingDevice = state.devices.find(d => d.address === action.payload.device.address);
            if (existingDevice) {
                existingDevice.connected = action.payload.connected;
            }
        },
        setBluetoothTrust(state, action: PayloadAction<{ trusted: boolean; device: BluetoothDevice }>) {
            const existingDevice = state.devices.find(d => d.address === action.payload.device.address);
            if (existingDevice) {
                existingDevice.trusted = action.payload.trusted;
            }
        },
        clearBluetoothDevices(state) {
            state.devices = [];
        }
    },
});

export const {
    setBluetoothDiscovery,
    setBluetoothDevice,
    addBluetoothDevice,
    setBluetoothConnection,
    setBluetoothTrust,
    clearBluetoothDevices
} = bluetoothSlice.actions;

export default bluetoothSlice.reducer;
