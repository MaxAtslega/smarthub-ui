import {useDispatch, useSelector} from "react-redux";
import {getEthernetInterface, getInterfacesData, getNetworkStatus, getWlanInterface} from "@/slices/network.slice";
import React, {useEffect, useState} from "react";
import checkInternetConnectivity from "@/utils/checkInternetConnectivity";
import {activateWlan, deactivateWlan, getScanResults, isWlanActivated} from "@/slices/wifi.slice";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import isPasswordProtected from "@/utils/isPasswordProtected";
import WifiIcon from "@/components/shared/WifiIcon";
import {
    useConnectWifiMutation,
    useDisconnectWifiMutation,
    useStartScanMutation,
    useStartWpaSupplicantMutation, useStopWpaSupplicantMutation
} from "@/api/wifi.api";
import {ScanResult} from "@/models/Wifi";

const Network = () => {
    const ethernetInterface = useSelector(getEthernetInterface);

    const wlanInterface = useSelector(getWlanInterface);
    const wlanStatus = useSelector(getNetworkStatus);
    const scanResults = useSelector(getScanResults);

    const [isEthernetConnected, setIsEthernetConnected] = useState<boolean>(false);
    const { t, i18n } = useTranslation();
    const [isInternetReachable, setIsInternetReachable] = useState<boolean>(false);

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


    useEffect(() => {
        const checkConnectivity = async () => {
            let internetStatus = false;

            if (ethernetInterface && ethernetInterface.addr.length > 0) {
                setIsEthernetConnected(true);
                internetStatus = await checkInternetConnectivity();
            } else {
                setIsEthernetConnected(false);
            }

            if (wlanInterface && wlanInterface.addr.length > 0) {
                internetStatus = await checkInternetConnectivity();
            } else {
            }

            setIsInternetReachable(internetStatus);
        };

        checkConnectivity().then();
    }, [ethernetInterface, wlanInterface]);


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
        <>
            <div>
                <h2>{t('network.title', 'Network')}</h2>

                {isEthernetConnected && isInternetReachable && (
                    <div className={"mt-4 p-2 rounded bg-special-green text-black"}>
                        <span>{t('network.ethernetConnected', 'You are connected via Ethernet. You can continue...')}</span>
                    </div>
                )}

                <div
                    className={"py-2 px-4 rounded bg-background-secondary mt-4 flex justify-between h-full items-center"}>
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
                            <div className={"mt-2"}>
                                <span className={"text-sm ml-2 opacity-80"}>{t('network.currentNetwork', 'Current Network')}</span>
                                <div className={"p-4 rounded bg-background-secondary mb-2 flex h-full items-center justify-between"}>
                                    <div className={"flex items-center"}>
                                        <span className={"mr-4 text-2xl"}>
                                            <WifiIcon signalLevel={parseInt(connectedWifi.signal_level, 10)}
                                                      isProtected={isPasswordProtected(connectedWifi.flags)} />
                                        </span>
                                        <div>
                                            <span className={"inline-block"}>{connectedWifi.ssid}</span>
                                            <span className={"block text-[0.7rem] opacity-60"}>{t('network.connected', 'Connected')}</span>
                                        </div>
                                    </div>

                                    <button onClick={() => disconnectWifi()}>{t('network.disconnect', 'Disconnect')}</button>
                                </div>
                            </div>
                        )}

                        <div className={"mt-2"}>
                            <span className={"text-sm ml-2 opacity-80"}>
                                {sortedWifiNetworks.length > 0 ? t('network.availableNetworks', 'Available Networks') : t('network.scanning', 'Scanning for Networks...')}
                            </span>
                            {sortedWifiNetworks.map((network, index) => (
                                <div key={index} className={"p-4 rounded bg-background-secondary mb-2 flex h-full items-center"}
                                     onClick={() => connectToWifi(network)}>
                                    <span className={"mr-4 text-2xl"}>
                                        <WifiIcon signalLevel={parseInt(network.signal_level, 10)}
                                                  isProtected={isPasswordProtected(network.flags)} />
                                    </span>

                                    <span className={"inline-block"}>{network.ssid}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className={"mt-4 pb-4"}>
                <button onClick={() => navigate(-1)} className={""}>{t('button.back', 'Back')}</button>
                <button disabled={!isInternetReachable} onClick={() => navigate("/setup/location")} className={"ml-4"}>{t('button.next', 'Next')}</button>
            </div>
        </>
    )
}

export default Network;