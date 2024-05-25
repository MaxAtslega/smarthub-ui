import Wifi from "@/models/Wifi";
import isPasswordProtected from "@/utils/isPasswordProtected";
import {redirect, useLocation, useNavigate} from "react-router-dom";
import {useConnectWifiMutation} from "@/api/wifi.api";
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

const ConnectWifi = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [connectWifi] = useConnectWifiMutation();
    const [enabled, setEnabled] = useState(false);
    const { t, i18n } = useTranslation();

    const passwordInput = useRef<HTMLInputElement | null>(null);

    if (location.state.wifi == null){
        navigate("/login")
        return <></>
    }

    const testPassword = () => {
        if (passwordInput.current != null && passwordInput.current.value.length >= 8){
            setEnabled(true);
        } else {
            setEnabled(false)
        }
    }

    return (
        <div>
            <h1>{location.state.wifi.ssid}</h1>
            <div className={"mt-4"}>
                <label className="form-label" htmlFor="password">{t('connectWifi.passwordLabel', 'Password')}</label>
                <input id="password"
                       ref={passwordInput}
                       onChange={() => testPassword()}
                       className={"mb-4 w-full px-4 py-3 mt-2"}
                       type="text"
                       placeholder={t('connectWifi.passwordPlaceholder', 'Enter password')} />

                <div className={"mt-2"}>
                    <button onClick={() => navigate(-1)} className="">{t('button.back', 'Back')}</button>
                    <button disabled={!enabled} onClick={() => {
                        connectWifi({
                            ssid: location.state.wifi.ssid,
                            psk: passwordInput.current?.value,
                        });
                        navigate(-1);
                    }} className={"ml-4"}>{t('connectWifi.connectButton', 'Connect')}</button>
                </div>
            </div>
        </div>
    );
}

export default ConnectWifi