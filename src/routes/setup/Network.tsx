import {useSelector} from "react-redux";
import {getInterfacesData} from "@/slices/network.slice";
import React, {useEffect, useState} from "react";
import checkInternetConnectivity from "@/utils/checkInternetConnectivity";
import {webSocketService} from "@/services/webSocketService";
import {selectWifiNetworks} from "@/slices/wifi.slice";
import {store} from "@/store";
import {selectUser} from "@/slices/user.slice";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import isPasswordProtected from "@/utils/isPasswordProtected";
import WifiIcon from "@/components/shared/WifiIcon";




const Network = () => {
    const interfaces = useSelector(getInterfacesData);
    const [isEthernetConnected, setIsEthernetConnected] = useState<boolean>(false);
    const [isWlanConnected, setIsWlanConnected] = useState<boolean>(false);
    const { t, i18n } = useTranslation();
    const [isInternetReachable, setIsInternetReachable] = useState<boolean>(false);

    const ethernetInterface = interfaces.find(intf => intf.name === 'eth0');
    const wlanInterface = interfaces.find(intf => intf.name === 'wlan0');

    const wifiNetworks = useSelector(selectWifiNetworks);
    const navigate = useNavigate();

    const sortedWifiNetworks = [...wifiNetworks].sort((a, b) => parseInt(b.signal_level, 10) - parseInt(a.signal_level, 10));

    useEffect(() => {
        const intervalId = setInterval(() => {
            webSocketService.sendMessage(JSON.stringify({
                t: "SCAN",
                op: 3,
                d: {}
            }));
        }, 20000); // 20000 milliseconds = 20 seconds

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const checkConnectivity = async () => {
            if (ethernetInterface && ethernetInterface.addr.length > 0) {
                setIsEthernetConnected(true);
                const internetStatus = await checkInternetConnectivity();
                setIsInternetReachable(internetStatus);
            } else if (wlanInterface && wlanInterface.addr.length > 0) {
                setIsWlanConnected(true);
                const internetStatus = await checkInternetConnectivity();
                setIsInternetReachable(internetStatus);
            } else {
                setIsEthernetConnected(false);
                setIsInternetReachable(false);
            }
        };

        checkConnectivity();
    }, [ethernetInterface]);


    return (
        <>
            <div>
                <h2>Network</h2>

                {isEthernetConnected && isInternetReachable && (
                    <div className={"mt-4 p-2 rounded bg-special-green text-black"}>
                        <span>You are connected via Ethernet. You can continue...</span>
                    </div>
                )}

                {isWlanConnected && isInternetReachable && (
                    <div className={"mt-4 p-2 rounded bg-special-green text-black"}>
                        <span>You are connected via Wlan. You can continue...</span>
                    </div>
                )}

                <div className={"mt-4"}>
                    <span className={"text-sm ml-2 opacity-80"}>Available Networks</span>

                    {sortedWifiNetworks.map((network, index) => (
                        <div key={index} className={"p-4 rounded bg-background-secondary mb-2 flex h-full items-center"} onClick={() => navigate("/setup/network/wifi", {state: { wifi: network }})}>
                            <span  className={"mr-4 text-2xl"}>
                                <WifiIcon signalLevel={parseInt(network.signal_level, 10)} isProtected={isPasswordProtected(network.capability)} />
                            </span>

                            <span className={"inline-block"}>{network.ssid}</span>
                        </div>
                    ))}
                </div>

            </div>

            <div className={"mt-8"}>
                <button onClick={() => navigate(-1)} className={""}>{t('button.back')}</button>
                <button disabled={!isEthernetConnected} className={"ml-4"}>{t('button.next')}</button>
            </div>

        </>
    )
}

export default Network;