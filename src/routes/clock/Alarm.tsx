import Map from "@/assets/map.svg";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/slices/user.slice";
import {useGetConstantsByUserIdQuery, usePostConstantMutation, usePutConstantMutation} from "@/api/constants.api";

function Alarm () {
    const navigate = useNavigate();

    const currentUser = useSelector(selectCurrentUser);
    const [alarms, setAlarms] = useState<any[]>([]);

    const { data: constants, isLoading: constantsLoading } = useGetConstantsByUserIdQuery(currentUser?.id || 0);
    const [postConstant] = usePostConstantMutation();
    const [putConstant] = usePutConstantMutation();

    useEffect(() => {
        if (constants) {
            const alarmConstant = constants.find(c => c.name === "ALARM");
            if (alarmConstant) {
                setAlarms(JSON.parse(alarmConstant.value));
            }
        }
    }, [constants]);

    const handleDelete = async (index: number) => {
        const updatedAlarms = alarms.filter((_, i) => i !== index);

        try {
            await putConstant({
                userId: currentUser?.id || 0,
                constantName: 'ALARM',
                newValue: JSON.stringify(updatedAlarms)
            }).unwrap();
            setAlarms(updatedAlarms);
        } catch (error) {
            console.error('Failed to delete the alarm:', error);
        }
    };

    return (
        <div className={"w-full"}>
            <button onClick={() => navigate("/app/clock/alarm/add")} className={"mb-4 w-full bg-background-third"}>Add
            </button>

            <h2 className={"w-full mt-4"}>Alarms</h2>
            <div className={"w-full mt-2"}>
                {constantsLoading && <span className={"opacity-60"}>Loading alarms</span>}
                {!constantsLoading && alarms.length > 0 && (
                    <>
                        <span className={"opacity-60"}>Your alarms</span>
                        <ul className={"m-0 p-0 mt-2"}>
                            {alarms.map((alarm, index) => (
                                <li key={index}
                                    className={"rounded flex justify-between items-center bg-background-third p-2 mb-2"}>
                                    <span>{`Time: ${String(String(alarm.time).split(":")[0]).padStart(2, "0")}:${String(String(alarm.time).split(":")[1]).padStart(2, "0")}, Date: ${alarm.date ? new Date(alarm.date).toDateString() : "None"}, Weekdays: ${alarm.weekdays.join(', ')}`}</span>
                                    <button onClick={() => handleDelete(index)}
                                            className={"px-4 bg-red-500 text-white p-1"}>Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                {!constantsLoading && alarms.length === 0 && <span className={"opacity-60"}>No alarms set</span>}
            </div>
        </div>
    )
}


function AlarmItem({date}: { date: Date }) {
    return (
        <li className={"w-full bg-background-third rounded p-2 flex justify-between items-center mb-2"}>
            <span>{date.toUTCString()}</span>
            <button className={"bg-background-secondary"}>Löschen</button>
        </li>
    )
}

export default Alarm