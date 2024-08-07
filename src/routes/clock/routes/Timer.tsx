import React, {useState} from "react";
import NumberSwiper from "@/components/shared/NumberSwiper";
import {useDispatch, useSelector} from "react-redux";
import {setActive, setTimer} from "@/slices/timer.slice";
import {RootState} from "@/store";


function Timer () {
    const dispatch = useDispatch();
    const [value, setValue]: [string, (value: (((prevState: string) => string) | string)) => void] = useState<string>("00:00:00");
    const timer = useSelector((state: RootState) => state.timer.timer);

    return (
        <div className="flex items-center justify-center w-full text-5xl">
            <button onClick={() => {
                dispatch(setActive(false))
            }} className={"text-xl mt-3 w-full h-full"}>Stop</button>

            <div className={"w-full mx-6"}>
                <NumberSwiper value={value} timer={timer} setValue={setValue} maxNumberCol1={59} maxNumberCol2={59} maxNumberCol3={99} elementId="myNumberSwiper"/>
            </div>

            <button onClick={() => {
                dispatch(setTimer(value))
                dispatch(setActive(true))
            }} className={"text-xl mt-3 w-full h-full"}>Start</button>
        </div>
    );
}

export default Timer