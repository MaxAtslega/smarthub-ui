interface Wifi {
    mac: string,
    ssid: string,
    channel: string,
    signal_level: string,
    capability: string
}

export default Wifi;

export interface WifiCredentials {
    ssid: string;
    psk?: string; // PSK is optional for open networks
}

export interface ScanResult {
    bssid: string;
    frequency: string;
    signal_level: string;
    flags: string;
    ssid: string;
}

export interface NetworkStatusResponse {
    ssid?: string;
    status: string;
    ip_address?: string;
}
