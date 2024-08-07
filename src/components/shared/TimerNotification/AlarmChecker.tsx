import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import TimerNotification from "./AlarmNotification";
import { selectCurrentUser } from "@/slices/user.slice";
import { useGetConstantsByUserIdQuery } from "@/api/constants.api";

const AlarmChecker = () => {
    const [triggerAlarm, setTriggerAlarm] = useState(false);
    const currentUser = useSelector(selectCurrentUser);
    const { data: constants } = useGetConstantsByUserIdQuery(currentUser?.id || 0);
    const [alarms, setAlarms] = useState<any[]>([]);

    useEffect(() => {
        if (constants) {
            const alarmConstant = constants.find(c => c.name === "ALARM");
            if (alarmConstant) {
                setAlarms(JSON.parse(alarmConstant.value));
            }
        }
    }, [constants]);

    useEffect(() => {
        const checkAlarms = () => {
            const now = new Date();
            const currentTime = now.toTimeString().substr(0, 5);
            const currentDay = now.toLocaleString('en-us', { weekday: 'short' });

            console.log(alarms)

            console.log(currentDay)

            alarms.forEach(alarm => {
                if (alarm.time === currentTime) {
                    if (alarm.date) {
                        const alarmDate = new Date(alarm.date).toDateString();
                        if (now.toDateString() === alarmDate) {
                            setTriggerAlarm(true);
                        }
                    } else if (alarm.weekdays.includes(currentDay)) {
                        setTriggerAlarm(true);
                    }
                }
            });
        };

        const intervalId = setInterval(checkAlarms, 60000); // Check every minute

        // Also check immediately on mount
        checkAlarms();

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [alarms]);

    return (
        <>
            {triggerAlarm && <TimerNotification onDeactivate={() => setTriggerAlarm(false)} />}
        </>
    );
};

export default AlarmChecker;
