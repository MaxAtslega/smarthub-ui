import {useSelector} from "react-redux";
import {getEthernetInterface, getInterfacesData, getNetworkStatus, getWlanInterface} from "@/slices/network.slice";
import WifiIcon from "@/components/shared/WifiIcon";
import isPasswordProtected from "@/utils/isPasswordProtected";
import React, {useEffect, useState} from "react";
import {getScanResults} from "@/slices/wifi.slice";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {
    useConnectWifiMutation,
    useDisconnectWifiMutation, useStartScanMutation,
    useStartWpaSupplicantMutation,
    useStopWpaSupplicantMutation
} from "@/api/wifi.api";
import {ScanResult} from "@/models/Wifi";

function Network() {
    const wlanStatus = useSelector(getNetworkStatus);
    const scanResults = useSelector(getScanResults);
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();

    const [connectWifi] = useConnectWifiMutation();
    const [disconnectWifi] = useDisconnectWifiMutation();
    const [startWpaSupplicant] = useStartWpaSupplicantMutation();
    const [stopWpaSupplicant] = useStopWpaSupplicantMutation();
    const [startScan] = useStartScanMutation();

    const connectToWifi = (wifi: ScanResult) => {
        if (!isPasswordProtected(wifi.flags)){
            connectWifi({
                ssid: wifi.ssid
            });
        } else {
            navigate("/setup/network/wifi", {state: {wifi: wifi}});
        }
    }


    let connectedWifi: ScanResult | undefined = undefined;

    if (wlanStatus && wlanStatus.ssid != undefined) {
        if(scanResults && scanResults.length > 0){
            connectedWifi = scanResults.find(wifi => wifi.ssid === wlanStatus.ssid);
        }
    }

    useEffect(() => {
        startScan();

        const intervalId = setInterval(() => {
            startScan();
        }, 30000); // 30000 milliseconds = 30 seconds

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);


    let sortedWifiNetworks: ScanResult[] = [];

    if (scanResults && scanResults.length > 0) {
        const uniqueNetworksMap = scanResults.reduce((acc, network) => {
            if (!acc[network.ssid] || parseInt(network.signal_level, 10) > parseInt(acc[network.ssid].signal_level, 10)) {
                acc[network.ssid] = network;
            }
            return acc;
        }, {} as Record<string, ScanResult>);

        sortedWifiNetworks = Object.values(uniqueNetworksMap).filter(value => value.ssid != connectedWifi?.ssid).sort((a, b) => parseInt(b.signal_level, 10) - parseInt(a.signal_level, 10));
    }

  return (
      <div>
          <h1>Network</h1>

          <div
              className={"py-2 px-4 rounded bg-background-third mt-4 flex justify-between h-full items-center"}>
              {wlanStatus == undefined || wlanStatus.status === "DEACTIVATED" ? (
                  <>
                      <span>{t('network.wlanOff', 'Off')}</span>
                      <button onClick={() => startWpaSupplicant()}>{t('network.wlanEnable', 'Enable')}</button>
                  </>
              ) : (
                  <>
                      <span>{t('network.wlanOn', 'On')}</span>
                      <button onClick={() => stopWpaSupplicant()}>{t('network.wlanDisable', 'Disable')}</button>
                  </>
              )}
          </div>

          {(wlanStatus != undefined && wlanStatus.status !== "DEACTIVATED") && (
              <>
                  {connectedWifi && (
                      <div className={"mt-4"}>
                          <span
                              className={"text-sm ml-2 opacity-80"}>{t('network.currentNetwork', 'Current Network')}</span>
                          <div
                              className={"p-4 rounded bg-background-third mb-2 flex h-full items-center justify-between"}>
                              <div className={"flex items-center"}>
                                        <span className={"mr-4 text-2xl"}>
                                            <WifiIcon signalLevel={parseInt(connectedWifi.signal_level, 10)}
                                                      isProtected={isPasswordProtected(connectedWifi.flags)}/>
                                        </span>
                                  <div>
                                      <span className={"inline-block"}>{connectedWifi.ssid}</span>
                                      <span
                                          className={"block text-[0.7rem] opacity-60"}>{t('network.connected', 'Connected')}</span>
                                  </div>
                              </div>

                              <button onClick={() => disconnectWifi()}>{t('network.disconnect', 'Disconnect')}</button>
                          </div>
                      </div>
                  )}

                  <div className={"mt-4"}>
                            <span className={"text-sm ml-2 opacity-80"}>
                                {sortedWifiNetworks.length > 0 ? t('network.availableNetworks', 'Available Networks') : t('network.scanning', 'Scanning for Networks...')}
                            </span>
                      {sortedWifiNetworks.map((network, index) => (
                          <div key={index}
                               className={"p-4 rounded bg-background-third mb-2 flex h-full items-center"}
                               onClick={() => connectToWifi(network)}>
                                    <span className={"mr-4 text-2xl"}>
                                        <WifiIcon signalLevel={parseInt(network.signal_level, 10)}
                                                  isProtected={isPasswordProtected(network.flags)}/>
                                    </span>

                              <span className={"inline-block"}>{network.ssid}</span>
                          </div>
                      ))}
                  </div>
              </>
          )}
      </div>
  )
}

export default Network
