import {NavigationBox} from "@/components/shared/NavigationBox";
import {Outlet} from "react-router-dom";
import React from "react";

interface BoxLayoutProps {
    boxes: NavigationBoxItems[],
}

export interface NavigationBoxItems {
    to: string,
    icon: React.ReactNode,
    color?: string
}

const BoxLayout = (props: BoxLayoutProps) => {
    return (
        <div>
            <div className={"flex items-stretch justify-between h-auto"}>
                <div className={"pr-3 absolute"}>
                    {
                        props.boxes.map((box, index) => (
                            <NavigationBox color={box.color} key={index} to={box.to}>{box.icon}</NavigationBox>
                        ))
                    }
                </div>
                <div className={"absolute left-[66px] bottom-0 top-0 ml-2 right-4"}>
                    <div className={"flex flex-col gap-2 h-full"}>
                        <Outlet/>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default BoxLayout