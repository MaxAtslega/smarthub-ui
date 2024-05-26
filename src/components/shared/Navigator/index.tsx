import React, {MouseEvent, useEffect, useRef, useState} from "react";
import {
    MdDashboard,
    MdCalendarMonth,
    MdHome,
    MdSettings,
    MdBluetoothConnected, MdVolumeUp, MdVolumeDown, MdVolumeMute, MdVolumeOff
} from "react-icons/md";
import { TiWeatherCloudy } from "react-icons/ti";
import {IoIosMoon, IoMdMusicalNotes} from "react-icons/io";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useLongPress from "@/utils/useLongPress";
import "./navigator.css"
import {LuClock} from "react-icons/lu";
import {BsWifi} from "react-icons/bs";
import {FaEthernet, FaWifi} from "react-icons/fa";
import {IoWifiSharp} from "react-icons/io5";
import {webSocketService} from "@/services/webSocketService";
import {useSelector} from "react-redux";
import {getEthernetInterface, getWlanInterface} from "@/slices/network.slice";
import {useTranslation} from "react-i18next";
import {getDevices, startDiscovering, stopDiscovering} from "@/utils/bluetooth";
import {RootState} from "@/store";

const Navigator = () => {
    return (
        <nav className={"h-[74px] fixed bottom-0  p-3 w-max"}>
            <div className={"flex items-stretch"}>
                <NavigatorItem to={"/app/dashboard"}><MdDashboard/></NavigatorItem>
                <NavigatorItem to={"/app/calendar"}><MdCalendarMonth/></NavigatorItem>
                <NavigatorItem to={"/app/music"}><IoMdMusicalNotes/></NavigatorItem>
                <NavigatorItem to={"/app/weather"}><TiWeatherCloudy/></NavigatorItem>
                <NavigatorItem to={"/app/clock"}><LuClock/></NavigatorItem>
                <NavigatorItem to={"/app/device-control"}><MdHome/></NavigatorItem>
                <NavigatorItem to={"/system/settings/"}><MdSettings/></NavigatorItem>
                <NavigatorSpace />
                <WifiItem />
                <BluetoothItem />
                <VolumeControlItem />
                <SleepItem />
            </div>
        </nav>
    )
}

const SleepItem = () => {
    return <div onClick={() => {
        webSocketService.sendMessage(JSON.stringify({
            t: "DISPLAY",
            op: 0
        }))
    }} className={`h-[50px] w-[50px] flex items-center justify-center 
        text-xl mr-3 rounded bg-background-secondary`}><IoIosMoon/></div>
}

const NavigatorItem = ({ children, to }: {children: React.ReactNode, to: string}) =>  {
    const location = useLocation();

    return (
        <Link to={to} className={`h-[50px] w-[50px] flex items-center justify-center 
        text-xl ${location.pathname.includes(to) ? "bg-primary-100" : "bg-background-secondary"} mr-3 rounded`}>{children}</Link>
    )
}

const NavigatorSpace = () =>  {
    return (
        <div className={"w-1 mr-3 bg-background-secondary rounded"}/>
    )
}

const VolumeControlItem = () =>  {
    const [volume, setVolume] = useState(100);
    const [volumePopupOpen, setVolumePopupOpen] = useState(false);
    const volumePopupRef = useRef<HTMLDivElement>(null);

    const onLongPress = () => {
        setVolumePopupOpen(!volumePopupOpen);
    };

    const onClick = () => {
        setVolume(volume === 0 ? 100 : 0);
    };

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 300,
    };

    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    // Close the volume popup when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: TouchEvent) => {
            if (volumePopupRef.current && !(event.target instanceof Node && volumePopupRef.current.contains(event.target as Node))) {
                setVolumePopupOpen(false);
            }
        };

        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [volumePopupRef]);

    return (
      <div ref={volumePopupRef} className={`cursor-pointer h-[50px] w-[50px]
        text-xl ${volumePopupOpen ? "bg-primary-100" : "bg-background-secondary"} mr-3 rounded`}>
          <div {...longPressEvent} className={`cursor-pointer h-[48px] w-[48px] flex items-center justify-center 
        text-xl rounded`}>
              {volume == 0 ? <MdVolumeOff/> : volume < 35 ? <MdVolumeMute/> : volume < 75 ? <MdVolumeDown/> :
                <MdVolumeUp/>}
          </div>
          {volumePopupOpen ?
            <div className={"absolute bottom-[80px] h-[200px] w-[50px] bg-background-third rounded"}>
                <span className={"absolute top-1 left-[18px]"}>+</span>
                <input className="-rotate-90 absolute top-24 -right-[45px] bottom-14 w-[136px]" type="range" step="1"
                       value={volume} min="0" max="100" onChange={(event) => setVolume(parseInt(event.target.value))}/>
                <span className={"absolute bottom-1 left-[21px]"}>-</span>
            </div> : null}
      </div>
    );
}

const BluetoothItem = () => {
    const navigate = useNavigate();
    const { devices } = useSelector((state: RootState) => state.bluetooth);
    const [bluetooth, setBluetooth] = useState(false);

    useEffect(() => {
        getDevices();
    }, []);

    useEffect(() => {
        setBluetooth(devices.filter(device => device.connected).length > 0);
    }, [devices]);

    const onLongPress = () => {
        navigate("/system/settings/bluetooth")
    };


    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 200,
    };

    const longPressEvent = useLongPress(onLongPress, () => {}, defaultOptions);

    return (
        <div {...longPressEvent} className={`cursor-pointer h-[48px] w-[48px] flex items-center justify-center 
        text-xl ${bluetooth ? "bg-primary-100" : "bg-background-secondary"} mr-3 rounded`}><MdBluetoothConnected/></div>
    )

}

const WifiItem = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const ethernetInterface = useSelector(getEthernetInterface);
    const wlanInterface = useSelector(getWlanInterface);

    const onLongPress = () => {
        navigate("/system/settings/network");
    };

    const onClick = () => {
        // You can add any additional click functionality here if needed
    };

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 200,
    };
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    let connectionStatus = null;
    let icon = <FaEthernet  />;
    let bgColor = "bg-background-secondary";

    if (ethernetInterface && ethernetInterface.addr.length > 0) {
        connectionStatus = 'ethernet';
        icon = <FaEthernet  />;
        bgColor = "bg-primary-100";
    } else if (wlanInterface && wlanInterface.addr.length > 0) {
        connectionStatus = 'wifi';
        icon = <IoWifiSharp />;
        bgColor = "bg-blue-500";
    }

    return (
        <div {...longPressEvent} className={`cursor-pointer h-[48px] w-[48px] flex items-center justify-center 
        text-xl ${bgColor} mr-3 rounded`}>
            {icon}
        </div>
    );
}

export default Navigator;
