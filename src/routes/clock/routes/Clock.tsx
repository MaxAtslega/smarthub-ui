import Map from "@/assets/map.svg";
import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

// Utility function to format time with leading zeros
const formatTime = (date: Date) => {
    return {
        hours: String(date.getUTCHours()).padStart(2, "0"),
        minutes: String(date.getUTCMinutes()).padStart(2, "0"),
    };
};

// Utility function to get time in a specific timezone based on UTC offset
const getTimeInTimeZone = (offset: number) => {
    const utcDate = new Date();
    const tzTime = new Date(utcDate.getTime() + offset * 3600000);
    return formatTime(tzTime);
};

function Clock() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => setDate(new Date()), 1000 * 20);
        return () => clearInterval(intervalId);
    }, []);

    const dateOptions: Intl.DateTimeFormatOptions = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
    const dateAsFormattedString = dateFormatter.format(date);

    return (
        <>
            <div className={"w-full flex flex-col"}>
                <div className={"flex justify-between mt-auto mb-auto"}>
                    <span>Los Angeles</span>
                    <span>{getTimeInTimeZone(-7).hours}:{getTimeInTimeZone(-7).minutes}</span>
                </div>
                <div className={"flex justify-between mb-auto"}>
                    <span>New York</span>
                    <span>{getTimeInTimeZone(-4).hours}:{getTimeInTimeZone(-4).minutes}</span>
                </div>
                <div className={"flex justify-between mb-auto"}>
                    <span>London</span>
                    <span>{getTimeInTimeZone(1).hours}:{getTimeInTimeZone(1).minutes}</span>
                </div>
            </div>
            <div className={"w-full h-full flex items-center justify-center flex-col"}>
                <img width={200} src={Map}  alt={"World"}/>
                <span className={"text-3xl font-bold mt-3"}>{getTimeInTimeZone(0).hours}:{getTimeInTimeZone(0).minutes}</span>
                <span className={"text-xl"}>{dateAsFormattedString}</span>
            </div>
            <div className={"w-full flex flex-col"}>
                <div className={"flex justify-between mt-auto mb-auto"}>
                    <span>Budapest</span>
                    <span>{getTimeInTimeZone(2).hours}:{getTimeInTimeZone(2).minutes}</span>
                </div>
                <div className={"flex justify-between mb-auto"}>
                    <span>Taiwan</span>
                    <span>{getTimeInTimeZone(8).hours}:{getTimeInTimeZone(8).minutes}</span>
                </div>
                <div className={"flex justify-between mb-auto"}>
                    <span>Japan</span>
                    <span>{getTimeInTimeZone(9).hours}:{getTimeInTimeZone(9).minutes}</span>
                </div>
            </div>
        </>
    );
}

export default Clock;
