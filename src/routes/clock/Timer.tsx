import Map from "@/assets/map.svg";
import React, {useState} from "react";
import NumberSwiper from "@/components/NumberSwiper";


const dateConf = {
    'hour': {
        format: 'hh',
        caption: 'Hour',
        step: 1,
    },
    'minute': {
        format: 'mm',
        caption: 'Min',
        step: 1,
    },
    'second': {
        format: 'hh',
        caption: 'Sec',
        step: 1,
    },
}


function Timer () {
    const [value, setValue] = useState<number>(0);

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-6">Number Swiper Example</h1>
            <p className="mb-6">Run This Demo On Touch Devices</p>
            <NumberSwiper maxNumberCol1={59} maxNumberCol2={59} maxNumberCol3={100} elementId="myNumberSwiper" initialValue={0} />
        </div>
    );
}

export default Timer