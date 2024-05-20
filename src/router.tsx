import {createBrowserRouter, redirect} from "react-router-dom";

import Dashboard from "@/routes/dashboard/Dashboard";
import Calendar from "@/routes/calendar/Calendar";
import Music from "@/routes/music/Music";
import Weather from "@/routes/weather/Weather";
import Settings from "@/routes/settings/Settings";
import Notifications from "@/routes/notifications/Notifications";
import Setup from "@/routes/setup/Setup";
import Layout from "@/components/Layout";
import DeviceControl from "@/routes/deviceControl/DeviceControl";
import React from "react";
import General from "@/routes/settings/General";
import Bluetooth from "@/routes/settings/Bluetooth";
import Actions from "@/routes/settings/Actions";
import Accounts from "@/routes/settings/Accounts";
import Clock from "@/routes/clock/Clock";
import Login from "@/routes/login/Login";
import CreateProfile from "@/routes/profile/CreateProfile";
import Splash from "@/routes/splash/Splash";
import SetupLayout from "@/components/SetupLayout";
import Network from "@/routes/setup/Network";
import ConnectWifi from "@/routes/setup/ConnectWifi";

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
        ]
    },
    {
        element: <Layout/>,
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
                element: <Music/>,
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
                path: "app/clock",
                element: <Clock/>,
            },
            {
                path: "system/settings/",
                element: <Settings/>,
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
                        element: <Network/>,
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
                        element: <Accounts/>,
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
