export interface BluetoothDevice {
    name: string;
    address: string;
    paired: boolean;
    connected: boolean;
    trusted: boolean;
    [key: string]: any; // Allow additional properties
}