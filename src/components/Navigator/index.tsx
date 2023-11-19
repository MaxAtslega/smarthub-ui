import React, {useState} from "react";
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

const Navigator = () => {
    return (
        <nav className={"h-[74px] p-3 w-max"}>
            <div className={"flex items-stretch"}>
                <NavigatorItem to={"/app/dashboard"}><MdDashboard/></NavigatorItem>
                <NavigatorItem to={"/app/calendar"}><MdCalendarMonth/></NavigatorItem>
                <NavigatorItem to={"/app/music"}><IoMdMusicalNotes/></NavigatorItem>
                <NavigatorItem to={"/app/weather"}><TiWeatherCloudy/></NavigatorItem>
                <NavigatorItem to={"/app/device-control"}><MdHome/></NavigatorItem>
                <NavigatorItem to={"/system/settings"}><MdSettings/></NavigatorItem>
                <NavigatorSpace />
                <BluetoothItem />
                <VolumeControlItem />
                <NavigatorItem to={"/system/settings"}><IoIosMoon/></NavigatorItem>
            </div>
        </nav>
    )
}

const NavigatorItem = ({ children, to }: {children: React.ReactNode, to: string}) =>  {
    const location = useLocation();

    return (
        <Link to={to} className={`h-[50px] w-[50px] flex items-center justify-center 
        text-xl ${location.pathname.startsWith(to) ? "bg-primary-100" : "bg-background-secondary"} mr-3 rounded`}>{children}</Link>
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

    const onLongPress = () => {
        setVolumePopupOpen(!volumePopupOpen)
    };

    const onClick = () => {
        setVolume(volume == 0 ? 100 : 0)
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 300,
    };
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    return (
        <div className={`cursor-pointer h-[50px] w-[50px]
        text-xl ${volumePopupOpen ? "bg-primary-100" : "bg-background-secondary"} mr-3 rounded`}>
            <div {...longPressEvent} className={`cursor-pointer h-[50px] w-[50px] flex items-center justify-center 
        text-xl rounded`}>
                {volume == 0 ? <MdVolumeOff/> : volume < 35 ? <MdVolumeMute/> : volume < 75 ? <MdVolumeDown/> : <MdVolumeUp/> }
            </div>
            {volumePopupOpen ? <div className={"absolute bottom-[74px] h-[200px] w-[50px] bg-background-secondary rounded"}>
                <input className="-rotate-90 absolute top-0 -right-[57px] bottom-0 w-[160px]" type="range" step="1" value={volume} min="0" max="100" onChange={(event) => setVolume(parseInt(event.target.value))}  />
            </div> : null }
        </div>

    )
}

const BluetoothItem = () => {
    const navigate = useNavigate();
    const [bluetooth, setBluetooth] = useState(false);

    function toggleBluetooth(){
        setBluetooth(!bluetooth)
    }

    const onLongPress = () => {
        setBluetooth(true)
        navigate("/system/settings/bluetooth")
    };

    const onClick = () => {
        toggleBluetooth()
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 200,
    };
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    return (
        <div {...longPressEvent} className={`cursor-pointer h-[50px] w-[50px] flex items-center justify-center 
        text-xl ${bluetooth ? "bg-primary-100" : "bg-background-secondary"} mr-3 rounded`}><MdBluetoothConnected/></div>
    )

}

export default Navigator;
