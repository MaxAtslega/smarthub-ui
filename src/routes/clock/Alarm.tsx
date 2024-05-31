import Map from "@/assets/map.svg";
import React from "react";

function Alarm () {
    return (
        <>
            <div className={"w-full flex flex-col"}>
                <div className={"flex justify-between mt-auto mb-auto"}>
                    <span>Los Angeles</span>
                    <span></span>
                </div>
                <div className={"flex justify-between mb-auto"}>
                    <span>New York</span>
                    <span></span>
                </div>
                <div className={"flex justify-between mb-auto"}>
                    <span>England</span>
                    <span></span>
                </div>
            </div>
            <div className={"w-full h-full flex items-center"}>
                <img width={300} src={Map}/>
            </div>
            <div className={"w-full"}>
                <div className={"flex justify-between mt-auto mb-auto"}>
                    <span>Budapest</span>
                    <span></span>
                </div>
                <div className={"flex justify-between mb-auto"}>
                    <span>Taiwan</span>
                    <span></span>
                </div>
                <div className={"flex justify-between mb-auto"}>
                    <span>Japan</span>
                    <span></span>
                </div>
            </div>
        </>
    )
}

export default Alarm