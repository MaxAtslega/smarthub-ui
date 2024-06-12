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
      <div className={"bg-background-secondary h-full w-full rounded overflow-auto p-2"}>
          <div>
              <h1>Bluetooth</h1>
              <div className="flex gap-2 mt-4 mb-4">
                  <button onClick={startDiscovering} disabled={discovering}>Start Scanning</button>
                  <button onClick={stopDiscovering} disabled={!discovering}>Stop Scanning</button>
              </div>

              {devices.filter(device => device.paired).length > 0 ?
                  <span
                      className={"text-sm ml-2 opacity-80"}>{t('bluetooth.pairedDevices', 'Paired Devices')}</span> : null}
              <div className={"mb-4"}>
                  {devices.filter(device => device.paired).map((device: BluetoothDevice) => (
                      <div key={device.address}
                           className="mb-2 flex bg-background-third rounded mx-2 px-3 py-2 items-center justify-between">
                          <span className={device.connected ? "text-primary-100" : ""}>{device.name}</span>

                          <div className="flex gap-2">
                              {
                                  device.connected ?
                                      <button onClick={() => handleDisconnect(device.address)}
                                              disabled={!device.connected}>
                                          Disconnect
                                      </button> :
                                      <button onClick={() => handleConnect(device.address)} disabled={device.connected}>
                                          Connect
                                      </button>
                              }

                              {
                                  device.trusted ?
                                      <button onClick={() => handleUntrust(device.address)} disabled={!device.trusted}>
                                          Untrust
                                      </button> :
                                      <button onClick={() => handleTrust(device.address)} disabled={device.trusted}>
                                          Trust
                                      </button>
                              }
                          </div>
                      </div>
                  ))}
              </div>

              <span className={"text-sm ml-2 opacity-80"}>{t('bluetooth.availableDevices', 'Available Devices')}</span>
              <div>
                  {devices.filter(device => !device.paired).map((device: BluetoothDevice) => (
                      <div key={device.address}
                           className="mb-2 flex bg-background-third rounded mx-2 px-3 py-2 items-center justify-between">
                          <span>{device.name}</span>

                          <div className="flex gap-2">
                              {
                                  device.connected ?
                                      <button onClick={() => handleDisconnect(device.address)}
                                              disabled={!device.connected}>
                                          Disconnect
                                      </button> :
                                      <button onClick={() => handleConnect(device.address)} disabled={device.connected}>
                                          Connect
                                      </button>
                              }

                              {
                                  device.trusted ?
                                      <button onClick={() => handleUntrust(device.address)} disabled={!device.trusted}>
                                          Untrust
                                      </button> :
                                      <button onClick={() => handleTrust(device.address)} disabled={device.trusted}>
                                          Trust
                                      </button>
                              }
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  )
}

export default Bluetooth
