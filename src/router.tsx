import {createBrowserRouter} from "react-router-dom";

import Dashboard from "@/routes/dashboard/Dashboard";
import Calendar from "@/routes/calendar/Calendar";
import Music from "@/routes/music/Music";
import Weather from "@/routes/weather/Weather";
import Settings from "@/routes/settings/Settings";
import Notifications from "@/routes/notifications/Notifications";
import Setup from "@/routes/setup/Setup";
import Layout from "@/components/Layout";
import DeviceControl from "@/routes/deviceControl/DeviceControl";

export default createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
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
