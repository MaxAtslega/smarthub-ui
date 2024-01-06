import React, {useEffect, useState} from "react";
import {
    MdNotifications
} from "react-icons/md";

import ProfilePicture from "@/assets/profile.jpg"

const Header = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDate(new Date()), 1000)
    })

    return (
        <div className={"h-[34px] w-full mb-1.5 px-3"}>
            <div className={"flex justify-between"}>
                <span className={"flex font-bold text-xs content-center flex-wrap"}>{date.toLocaleTimeString()}</span>
                <div className={"h-full flex align-middle"}>
                    <MdNotifications className={"flex h-[34px] mr-3"} style={{"fontSize": "20px"}} />
                    <div className={"flex content-center flex-wrap"}><Space /></div>
                    <div className={"text-xs flex content-center flex-wrap"}>
                        <img className={"w-6 h-6 mr-3 rounded-full"} src={ProfilePicture} alt={""}/>
                        <span className={"text-xs flex content-center flex-wrap font-bold"}>Max Atslega</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Space = () =>  {
    return (
        <span className={"w-0.5 h-6 mr-3 bg-background-secondary rounded"}/>
    )
}

export default Header
