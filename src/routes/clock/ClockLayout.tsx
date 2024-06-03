import Map from "@/assets/map.svg"
import {Link, Outlet, useLocation} from "react-router-dom";
import React from "react";

function ClockLayout() {
    return (
        <div className={"flex flex-col h-full"}>
            <div className={"mb-4 flex w-full bg-background-secondary p-4 rounded justify-between"}>
                <NavItem name={"Timer"} to={"timer"} />
                <NavItem name={"Clock"} to={"clock"} />
                <NavItem name={"Alarm"} to={"alarm"} />
            </div>

            <div className={"min-h-[270px] bg-background-secondary rounded p-4 flex justify-between overflow-auto"}>
                <Outlet />
            </div>
        </div>
    )
}


function NavItem({ name, to }: { name: string, to: string }) {
    const location = useLocation();

    return (
        <Link to={"/app/clock/" + to} className={`pointer w-full bg-background-third p-2 mr-4 rounded text-center  ${location.pathname.includes("/app/clock/" + to) ? "text-primary-100" : ""}`}>{name}</Link>
    )
}

export default ClockLayout
