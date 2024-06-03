import {createBrowserRouter, redirect} from "react-router-dom";

import Dashboard from "@/routes/dashboard/Dashboard";
import Calendar from "@/routes/calendar/Calendar";
import MusicLayout from "@/routes/music/MusicLayout";
import Weather from "@/routes/weather/Weather";
import Settings from "@/routes/settings/Settings";
import Notifications from "@/routes/notifications/Notifications";
import Setup from "@/routes/setup/Setup";
import DefaultLayout from "@/components/layouts/Default";
import DeviceControl from "@/routes/deviceControl/DeviceControl";
import React from "react";
import General from "@/routes/settings/General";
import Bluetooth from "@/routes/settings/Bluetooth";
import Actions from "@/routes/settings/Actions";
import Accounts from "@/routes/settings/Accounts";
import ClockLayout from "@/routes/clock/ClockLayout";
import Login from "@/routes/login/Login";
import CreateProfile from "@/routes/profile/CreateProfile";
import Splash from "@/routes/splash/Splash";
import SetupLayout from "@/components/layouts/SetupLayout";
import Network from "@/routes/setup/Network";
import ConnectWifi from "@/routes/setup/ConnectWifi";
import Location from "@/routes/setup/Location";
import NetworkSettings from "@/routes/settings/Network"
import Customize from "@/routes/settings/Customize";
import Clock from "@/routes/clock/Clock";
import Timer from "@/routes/clock/Timer";
import Alarm from "@/routes/clock/Alarm";
import AddAlarm from "@/routes/clock/AddAlarm";
import BoxLayout, {NavigationBoxItems} from "@/components/layouts/BoxLayout";
import {FaCogs} from "react-icons/fa";
import {BsWifi} from "react-icons/bs";
import {IoMdBluetooth} from "react-icons/io";
import {RiRfidFill} from "react-icons/ri";
import {BiSolidCustomize} from "react-icons/bi";
import {LuUsers} from "react-icons/lu";

const settingsUrls: NavigationBoxItems[] = [
    {
        to: "/system/settings/general",
        icon: <FaCogs/>
    },
    {
        to: "/system/settings/network",
        icon: <BsWifi/>
    },
    {
        to: "/system/settings/bluetooth",
        icon: <IoMdBluetooth/>
    },
    {
        to: "/system/settings/actions",
        icon: <RiRfidFill/>
    },
    {
        to: "/system/settings/customize",
        icon: <BiSolidCustomize/>
    },
    {
        to: "/system/settings/accounts",
        icon: <LuUsers/>
    }
]

export default createBrowserRouter([
    {
        path: "*",
        loader: () => redirect("/login")
    },
    {
        path: "/",
        loader: () => redirect("/login"),
    },
    {
        path: "/login",
        element: <Login />,
    },{
        path: "/splash",
        element: <Splash />,
    },
    {
        element: <SetupLayout/>,
        children: [
            {
                path: "/setup",
                element: <Setup />,
            },
            {
                path: "/setup/network",
                element: <Network />,
            },
            {
                path: "/setup/network/wifi",
                element: <ConnectWifi />,
            },
            {
                path: "/create-profile",
                element: <CreateProfile />,
            },
            {
                path: "/setup/location",
                element: <Location />,
            },
        ]
    },
    {
        element: <DefaultLayout />,
        children: [
            {
                path: "app/dashboard",
                element: <Dashboard/>,
            },
            {
                path: "app/calendar",
                element: <Calendar/>,
            },
            {
                path: "app/music",
                element: <MusicLayout/>,
            },
            {
                path: "app/device-control",
                element: <DeviceControl/>,
            },
            {
                path: "app/weather",
                element: <Weather/>,
            },
            {
                path: "app/clock/",
                element: <ClockLayout/>,
                children: [
                    {
                        path: "alarm",
                        element: <Alarm/>,
                    },
                    {
                        path: "alarm/add",
                        element: <AddAlarm />,
                    },
                    {
                        path: "timer",
                        element: <Timer/>,
                    },
                    {
                        path: "clock",
                        element: <Clock/>,
                    },
                    {
                        path: "",
                        loader: () => redirect("/app/clock/clock"),
                    },
                ]
            },
            {
                path: "system/settings/",
                element: <BoxLayout boxes={settingsUrls}/>,
                children: [
                    {
                        path: "general",
                        element: <General/>,
                    },
                    {
                        path: "bluetooth",
                        element: <Bluetooth/>,
                    },
                    {
                        path: "network",
                        element: <NetworkSettings />,
                    },
                    {
                        path: "actions",
                        element: <Actions/>,
                    },
                    {
                        path: "accounts",
                        element: <Accounts/>,
                    },
                    {
                        path: "customize",
                        element: <Customize />,
                    },
                    {
                        path: "",
                        loader: () => redirect("/system/settings/general"),
                    },
                ]
            },
            {
                path: "system/notifications",
                element: <Notifications/>,
            },
        ]
    },
]);
