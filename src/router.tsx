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

export default createBrowserRouter([
    {
      path: "/",
      loader: () => redirect("app/dashboard")
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
                path: "system/settings",
                element: <Settings/>,
                children: [
                    {
                        path: "general",
                        element: <Settings/>,
                    },
                    {
                        path: "bluetooth",
                        element: <Settings/>,
                    },
                    {
                        path: "wlan",
                        element: <Settings/>,
                    },
                    {
                        path: "accounts",
                        element: <Settings/>,
                    },
                    {
                        path: "apps",
                        element: <Settings/>,
                    }
                ]
            },
            {
                path: "system/notifications",
                element: <Notifications/>,
            },
        ]
    },
    {
        path: "system/setup",
        element: <Setup />,
    },
]);
