import {MdCalendarMonth, MdDashboard, MdHome, MdSettings} from "react-icons/md";
import {IoMdBluetooth, IoMdMusicalNotes} from "react-icons/io";
import {TiWeatherCloudy} from "react-icons/ti";
import React, {ReactNode} from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import {FaCog, FaCogs, FaPencilRuler, FaUser} from "react-icons/fa";
import {BsWifi} from "react-icons/bs";
import {RiRfidFill} from "react-icons/ri";
import {BiSolidCustomize} from "react-icons/bi";
import {LuUsers} from "react-icons/lu";

function Settings() {
    return (
        <div className={"flex items-stretch justify-start"}>
          <div className={"pr-3"}>
            <NavigatorItem to={"/system/settings/general"}><FaCogs/></NavigatorItem>
            <NavigatorItem to={"/system/settings/network"}><BsWifi/></NavigatorItem>
            <NavigatorItem to={"/system/settings/bluetooth"}><IoMdBluetooth/></NavigatorItem>
            <NavigatorItem to={"/system/settings/actions"}><RiRfidFill/></NavigatorItem>
            <NavigatorItem to={"/system/settings/customize"}><BiSolidCustomize/></NavigatorItem>
            <NavigatorItem to={"/system/settings/accounts"}><LuUsers/></NavigatorItem>
          </div>
          <div className={"bg-background-secondary fixed top-[42px] left-[74px] w-[714px] h-[360px] p-3 rounded"}>
            <div className={"h-[100%] overflow-auto"}>
              <Outlet />
            </div>
          </div>
        </div>
    )
}

const NavigatorItem = ({ children, to }: {children: React.ReactNode, to: string}) =>  {
  const location = useLocation();

  return (
    <Link to={to} className={`h-[50px] w-[50px] flex items-center justify-center 
        text-xl ${location.pathname.startsWith(to) ? "bg-primary-100" : "bg-background-secondary"} mb-3 last:mb-0 rounded`}>{children}</Link>
  )
}

export default Settings
