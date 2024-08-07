import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { BiTimer } from "react-icons/bi";
import { setActive } from "@/slices/timer.slice";
import AlarmAudio from "@/assets/mixkit-alarm-tone-996.wav";

interface TimerNotificationProps {
    onDeactivate: () => void;
}

const AlarmNotification: React.FC<TimerNotificationProps> = ({ onDeactivate }) => {
    const timer = useSelector((state: RootState) => state.timer.timer);
    const currentDate = useSelector((state: RootState) => state.timer.currentDate);
    const isActive = useSelector((state: RootState) => state.timer.isActive);
    const dispatch = useDispatch();

    useEffect(() => {
        const audio = new Audio(AlarmAudio);
        audio.loop = true; // Ensure the audio loops
        audio.play().catch((error) => console.error("Audio play failed:", error));

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    return (
        <div className={"z-40 fixed bg-transparent h-[480px] w-[800px] flex justify-center top-0 left-0 mt-[100px] drop-shadow-4xl"}>
            <div className={"w-[200px] h-[200px] bg-background-third flex justify-center items-center flex-col rounded p-2"}>
                <BiTimer className={"text-8xl"} />
                <span className={"pb-4"}>Alarm</span>
                <button onClick={() => { dispatch(setActive(false)); onDeactivate(); }} className={"w-full bg-background-secondary"}>Deactivate</button>
            </div>
        </div>
    )
}

export default AlarmNotification;
