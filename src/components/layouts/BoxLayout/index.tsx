import {NavigationBox} from "@/components/shared/NavigationBox";
import {FaCogs} from "react-icons/fa";
import {BsWifi} from "react-icons/bs";
import {IoMdBluetooth} from "react-icons/io";
import {RiRfidFill} from "react-icons/ri";
import {BiSolidCustomize} from "react-icons/bi";
import {LuUsers} from "react-icons/lu";
import {Outlet} from "react-router-dom";
import React from "react";

interface BoxLayoutProps {
    boxes: NavigationBoxItems[]
}

export interface NavigationBoxItems {
    to: string,
    icon: React.ReactNode,
}

const BoxLayout = (props: BoxLayoutProps) => {
    return (
        <div className={"flex items-stretch justify-between h-auto"}>
            <div className={"pr-3 absolute"}>
                {
                    props.boxes.map((box, index) => (
                        <NavigationBox key={index} to={box.to}>{box.icon}</NavigationBox>
                    ))
                }
            </div>
            <div className={"ml-[62px] h-full bg-background-secondary w-full rounded"}>
                <div>
                    <div className={"p-3 min-h-[360px]"}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoxLayout