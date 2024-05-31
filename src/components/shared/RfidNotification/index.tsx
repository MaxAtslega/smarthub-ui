import {RiRfidFill} from "react-icons/ri";
import React from "react";

const RfidNotification = () => {
  return (
    <div className={"z-40 fixed bg-transparent h-[480px] w-[800px] flex justify-center top-0 left-0 mt-[100px] drop-shadow-2xl"}>
      <div className={"w-[200px] h-[200px] bg-background-third flex justify-center items-center flex-col rounded"}>
        <RiRfidFill className={"text-8xl"}/>
        <span className={""}>RFID Detected</span>
      </div>
    </div>
  )
}

export default RfidNotification