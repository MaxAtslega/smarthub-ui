import React, {useState} from "react";
import {
    MdDashboard,
    MdCalendarMonth,
    MdHome,
    MdSettings,
    MdBluetoothConnected, MdVolumeUp
} from "react-icons/md";
import { TiWeatherCloudy } from "react-icons/ti";
import {IoIosMoon, IoMdMusicalNotes} from "react-icons/io";
import {Link, useLocation} from "react-router-dom";

const Navigator = () => {

    return (
        <nav className={"h-[74px] p-3 w-max"}>
            <div className={"flex items-stretch"}>
                <NavigatorItem to={"/"}><MdDashboard/></NavigatorItem>
                <NavigatorItem to={"/app/calendar"}><MdCalendarMonth/></NavigatorItem>
                <NavigatorItem to={"/app/music"}><IoMdMusicalNotes/></NavigatorItem>
                <NavigatorItem to={"/app/weather"}><TiWeatherCloudy/></NavigatorItem>
                <NavigatorItem to={"/app/device-control"}><MdHome/></NavigatorItem>
                <NavigatorItem to={"/system/settings"}><MdSettings/></NavigatorItem>
                <NavigatorSpace />
                <BluetoothItem />
                <NavigatorItem to={"/system/settings"}><MdVolumeUp/></NavigatorItem>
                <NavigatorItem to={"/system/settings"}><IoIosMoon/></NavigatorItem>
            </div>
        </nav>
    )
}

const NavigatorItem = ({ children, to }: {children: React.ReactNode, to: string}) =>  {
    const location = useLocation();

    return (
        <Link to={to} className={`h-[50px] w-[50px] flex items-center justify-center 
        text-xl ${location.pathname == to ? "bg-primary-100" : "bg-background-secondary"} mr-3 rounded`}>{children}</Link>
    )
}

const NavigatorSpace = () =>  {
    return (
        <div className={"w-1 mr-3 bg-background-secondary rounded"}/>
    )
}

const BluetoothItem = () => {
    const [bluetooth, setBluetooth] = useState(false);

    function toggleBluetooth(){
        setBluetooth(!bluetooth)
    }

    return (
        <div onClick={toggleBluetooth} className={`cursor-pointer h-[50px] w-[50px] flex items-center justify-center 
        text-xl ${bluetooth ? "bg-primary-100" : "bg-background-secondary"} mr-3 rounded`}><MdBluetoothConnected/></div>
    )

}

export default Navigator;
