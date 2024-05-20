import React from 'react';
import {
    MdNetworkWifi1Bar,
    MdNetworkWifi2Bar,
    MdNetworkWifi3Bar,
    MdSignalWifi4Bar,
    MdSignalWifiConnectedNoInternet0,
    MdSignalWifi1BarLock,
    MdSignalWifi2BarLock,
    MdSignalWifi3BarLock,
    MdOutlineSignalWifi4BarLock,
} from 'react-icons/md';

interface WifiIconProps {
    signalLevel: number;
    isProtected: boolean;
}

const convertDbmToSignalLevel = (dbm: number) => {
    if (dbm >= -50) return 4; // Excellent signal
    if (dbm >= -60) return 3; // Good signal
    if (dbm >= -70) return 2; // Fair signal
    if (dbm >= -80) return 1; // Weak signal
    return 0; // No signal
};

const WifiIcon: React.FC<WifiIconProps> = ({ signalLevel, isProtected }) => {
    const level = convertDbmToSignalLevel(signalLevel);

    const getWifiIcon = (level: number, protectedStatus: boolean) => {
        if (protectedStatus) {
            switch (level) {
                case 0:
                    return <MdSignalWifiConnectedNoInternet0 />;
                case 1:
                    return <MdSignalWifi1BarLock />;
                case 2:
                    return <MdSignalWifi2BarLock />;
                case 3:
                    return <MdSignalWifi3BarLock />;
                case 4:
                    return <MdOutlineSignalWifi4BarLock />;
                default:
                    return <MdSignalWifiConnectedNoInternet0 />;
            }
        } else {
            switch (level) {
                case 0:
                    return <MdSignalWifiConnectedNoInternet0 />;
                case 1:
                    return <MdNetworkWifi1Bar />;
                case 2:
                    return <MdNetworkWifi2Bar />;
                case 3:
                    return <MdNetworkWifi3Bar />;
                case 4:
                    return <MdSignalWifi4Bar />;
                default:
                    return <MdSignalWifiConnectedNoInternet0 />;
            }
        }
    };

    return <div className="wifi-icon">{getWifiIcon(level, isProtected)}</div>;
};

export default WifiIcon;
