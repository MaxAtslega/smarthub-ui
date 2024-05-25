import {webSocketService} from "@/services/webSocketService";
import React, {useEffect} from "react";
import {connect, disconnect, getDevices, startDiscovering, stopDiscovering, trust, untrust} from "@/utils/bluetooth";
import {clearBluetoothDevices} from "@/slices/bluetooth.slice";
import {RootState} from "@/store";
import {useDispatch, useSelector} from "react-redux";
import {BluetoothDevice} from "@/models/Bluetooth";
import {useTranslation} from "react-i18next";

function Bluetooth() {
    const dispatch = useDispatch();
    const { discovering, devices } = useSelector((state: RootState) => state.bluetooth);
    const { t, i18n } = useTranslation();

    const handleConnect = (address: string) => {
        connect(address);
    };

    const handleDisconnect = (address: string) => {
        disconnect(address);
    };

    const handleTrust = (address: string) => {
        trust(address);
    };

    const handleUntrust = (address: string) => {
        untrust(address);
    };

    useEffect(() => {
        // Start discovering devices when the component mounts
        startDiscovering();
        getDevices();

        return () => {
            // Stop discovering devices and clear the list when the component unmounts
            stopDiscovering();
        };
    }, []);

  return (
      <div>
          <h1>Bluetooth</h1>
          <div className="flex gap-2 mt-4">
              <button onClick={startDiscovering} disabled={discovering}>Start Scanning</button>
              <button onClick={stopDiscovering} disabled={!discovering}>Stop Scanning</button>
          </div>

          {devices.filter(device => device.paired).length > 0 ?
              <span className={"text-sm ml-2 opacity-80"}>{t('bluetooth.pairedDevices', 'Paired Devices')}</span> : null}
          <ul>
              {devices.filter(device => device.paired).map((device: BluetoothDevice) => (
                  <li key={device.address} className="border mb-2">
                      <p>Name: {device.name}</p>
                      <p>Address: {device.address}</p>
                      <p>Paired: {device.paired ? 'Yes' : 'No'}</p>
                      <p>Connected: {device.connected ? 'Yes' : 'No'}</p>
                      <p>Trusted: {device.trusted ? 'Yes' : 'No'}</p>
                      <div className="flex gap-2">
                          <button onClick={() => handleConnect(device.address)} disabled={device.connected}>
                              Connect
                          </button>
                          <button onClick={() => handleDisconnect(device.address)} disabled={!device.connected}>
                              Disconnect
                          </button>
                          <button onClick={() => handleTrust(device.address)} disabled={device.trusted}>
                              Trust
                          </button>
                          <button onClick={() => handleUntrust(device.address)} disabled={!device.trusted}>
                              Untrust
                          </button>
                      </div>
                  </li>
              ))}
          </ul>

          <span className={"text-sm ml-2 opacity-80"}>{t('bluetooth.availableDevices', 'Available Devices')}</span>
          <ul>
              {devices.filter(device => !device.paired).map((device: BluetoothDevice) => (
                  <li key={device.address} className="border mb-2">
                      <p>Name: {device.name}</p>
                      <p>Address: {device.address}</p>
                      <p>Paired: {device.paired ? 'Yes' : 'No'}</p>
                      <p>Connected: {device.connected ? 'Yes' : 'No'}</p>
                      <p>Trusted: {device.trusted ? 'Yes' : 'No'}</p>
                      <div className="flex gap-2">
                          <button onClick={() => handleConnect(device.address)} disabled={device.connected}>
                              Connect
                          </button>
                          <button onClick={() => handleDisconnect(device.address)} disabled={!device.connected}>
                              Disconnect
                          </button>
                          <button onClick={() => handleTrust(device.address)} disabled={device.trusted}>
                              Trust
                          </button>
                          <button onClick={() => handleUntrust(device.address)} disabled={!device.trusted}>
                              Untrust
                          </button>
                      </div>
                  </li>
              ))}
          </ul>
      </div>
  )
}

export default Bluetooth
