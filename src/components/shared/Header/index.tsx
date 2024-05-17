import React, {useEffect, useState} from "react";
import {
    MdNotifications
} from "react-icons/md";

import ProfilePicture from "@/assets/profile.jpg"
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentUser, selectUser} from "@/slices/user.slice";
import {store} from "@/store";

const Header = () => {
    const [date, setDate] = useState(new Date());
    const location = useLocation();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        setInterval(() => setDate(new Date()), 1000*20)
    })

    return (
        <div className={"h-[38px] fixed top-0 left-0 w-full px-3 mb-1 pt-1"}>
            <div className={"flex justify-between items-center h-[100%]"}>
                <span className={"flex font-bold text-xs content-center flex-wrap"}>{date.getHours()}:{date.getMinutes()}</span>
                <div className={"h-full flex align-middle"}>
                    <Link to={"/system/notifications"} className={`${location.pathname.includes("system/notifications")
                      ? "text-primary-200" : "text-white"}`}><MdNotifications className={"flex h-[38px] mr-3"} style={{"fontSize": "20px"}} /></Link>
                    <div className={"flex content-center flex-wrap"}><Space /></div>
                    <div className={"text-xs flex content-center flex-wrap"}>
                        <span onClick={() => store.dispatch(selectUser(null))} className={"text-xs flex content-center flex-wrap font-bold"}>{currentUser?.username}</span>
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
