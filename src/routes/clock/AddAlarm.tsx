import React, {ForwardedRef, forwardRef, useEffect, useState} from "react";
import NumberSwiper from "@/components/NumberSwiper";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {SlCalender} from "react-icons/sl";
import {useGetConstantsByUserIdQuery, usePostConstantMutation, usePutConstantMutation, useDeleteConstantByUserIdAndNameMutation} from "@/api/constants.api";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/slices/user.slice";
import {Navigate, useNavigate} from "react-router-dom";
import TimeSwiper from "@/components/TimeSwiper";
import './addAlarm.style.css';

interface CustomInputProps {
    value?: string;
    onClick?: () => void;
}

function AddAlarm () {
    const [value, setValue] = useState<string>("00:00");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
    const [alarms, setAlarms] = useState<any[]>([]);
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    const { data: constants} = useGetConstantsByUserIdQuery(currentUser?.id || 0);
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

    if (currentUser == null) {
        return <Navigate to="/login" />;
    }

    const ExampleCustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            <SlCalender />
        </button>
    ));

    const handleDateChange = (date: Date | null) => {
        setStartDate(date || new Date());
        if (date) {
            setSelectedWeekdays([]);
        }
    };

    const toggleWeekday = (day: string) => {
        setStartDate(null);
        setSelectedWeekdays(prevState => {
            if (prevState.includes(day)) {
                return prevState.filter(d => d !== day);
            } else {
                return [...prevState, day];
            }
        });
    };

    const handleSave = async () => {
        const newAlarm = {
            time: value,
            date: startDate ? startDate.toISOString() : null,
            weekdays: selectedWeekdays
        };

        const updatedAlarms = [...alarms, newAlarm];

        try {
            if (alarms.length === 0) {
                await postConstant({
                    name: 'ALARM',
                    user_id: currentUser?.id || 0,
                    value: JSON.stringify(updatedAlarms)
                }).unwrap();
            } else {
                await putConstant({
                    userId: currentUser?.id || 0,
                    constantName: 'ALARM',
                    newValue: JSON.stringify(updatedAlarms)
                }).unwrap();
            }
            setAlarms(updatedAlarms);

            navigate("/app/clock/alarm")
        } catch (error) {
            console.error('Failed to save the alarm:', error);
            alert('Failed to save the alarm.');
        }
    };

    return (
        <div id={"alarm"} className={"w-full h-full"}>
            <h2 className={"w-full"}>Add Alarm</h2>
            <div className={"w-full flex justify-between mt-2"}>
                <div className={"flex items-center text-6xl p-2 mr-4 bg-background-third"}>
                    <TimeSwiper value={value} timer={"00:00"} setValue={setValue} maxNumberCol1={59} maxNumberCol2={23} elementId="myNumberSwiper"/>
                </div>
                <div className={"w-full bg-background-third p-4"}>
                    <div className="flex justify-between items-center">
                        <div className={"w-full"}>
                            <span>{startDate ? startDate.toDateString() : selectedWeekdays.length == 0 ? "Nothing is selected" : selectedWeekdays.join(', ')}</span>
                        </div>
                        <ReactDatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            customInput={<ExampleCustomInput/>}
                        />
                    </div>

                    <div className={"flex flex-wrap gap-2 my-4"}>
                        {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
                            <div key={day}>
                                <input
                                    type="checkbox"
                                    name={day.toLowerCase()}
                                    id={day.toLowerCase()}
                                    checked={selectedWeekdays.includes(day)}
                                    onChange={() => toggleWeekday(day)}
                                />
                                <label htmlFor={day.toLowerCase()}>{day}</label>
                            </div>
                        ))}
                    </div>

                    <button className={"w-full bg-background-secondary"} onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default AddAlarm;
