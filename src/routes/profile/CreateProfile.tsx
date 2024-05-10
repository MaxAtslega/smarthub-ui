import User from "@/models/User";
import {IoMdAdd} from "react-icons/io";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/slices/user.slice";
import {useNavigate} from "react-router-dom";
import DatePicker from 'react-datepicker';
import './react-datepicker.css';
import Input from "@/components/Input";
import {useCreateUserMutation} from "@/api/users.api";

function CreateProfile() {
    const [createUser, {isLoading, error}] = useCreateUserMutation();
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [nameInput, setNameInput] = useState("");
    const [birthdayInput, setBirthdayInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setInterval(() => setDate(new Date()), 1000*20)
    })

    const createProfile = async () => {
        const response = await createUser({
            user: {
                username: nameInput,
                birthday: birthdayInput,
                theme: 1,
                language: "en",
            }
        }).then((response) => {

        });

    }

    return (
        <div className={"flex flex-col relative h-[480px]"}>
            <div className={"h-[38px] w-full px-3 mb-1 pt-1"}>
                <div className={"flex justify-between items-center h-[100%]"}>
                    <span className={"flex font-bold text-xs content-center flex-wrap"}>
                        {date.getHours()}:{date.getMinutes()}
                    </span>
                </div>
            </div>

            <div className={"h-full px-4"}>
                <h2 className={"content-center pb-5"}>Create Profile</h2>

                <div
                    className={"text-special-redColor bg-special-red px-2 rounded mb-4 " + (error != undefined && 'data' in error ? "" : "hidden")}>
                    {
                        error != undefined && 'data' in error && error.data != undefined ?
                            <span>{(error.data as { message: string }).message}</span> : null
                    }
                    {
                        error != undefined && 'data' in error && error.status == "PARSING_ERROR" ?
                            <span>Please fill out all required fields before submitting!</span> : null
                    }
                </div>

                <label className="form-label" htmlFor={"name"}>Name</label>
                <input id={"name"}
                       onChange={(e) => setNameInput(e.target.value)}
                       className={"mb-4 w-full px-4 py-3 mt-2"} value={nameInput}
                       type={"text"} placeholder={"Your name"}/>

                <label className="form-label" htmlFor={"name2"}>Name</label>
                <input id={"name2"}
                       onChange={(e) => setNameInput(e.target.value)}
                       className={"mb-4 w-full px-4 py-3 mt-2"} value={nameInput}
                       type={"text"} placeholder={"Your name"}/>

                <label className="form-label" htmlFor={"name3"}>Name</label>
                <input id={"name3"}
                       onChange={(e) => setNameInput(e.target.value)}
                       className={"mb-4 w-full px-4 py-3 mt-2"} value={nameInput}
                       type={"text"} placeholder={"Your name"}/>

                <label className="form-label" htmlFor={"name4"}>Name</label>
                <input id={"name4"}
                       onChange={(e) => setNameInput(e.target.value)}
                       className={"mb-4 w-full px-4 py-3 mt-2"} value={nameInput}
                       type={"text"} placeholder={"Your name"}/>

                <label className="form-label" htmlFor={"name5"}>Name</label>
                <input id={"name5"}
                       onChange={(e) => setNameInput(e.target.value)}
                       className={"mb-4 w-full px-4 py-3 mt-2"} value={nameInput}
                       type={"text"} placeholder={"Your name"}/>

                <label className="form-label" htmlFor={"birthday"}>Birthday</label>
                <input id={"birthday"}
                       onChange={(e) => setBirthdayInput(e.target.value)}
                       className={"w-full px-4 py-3 mt-2"} value={birthdayInput}
                       type={"date"}/>

                <div className={"flex gap-4 pt-4"}>
                    <button disabled={isLoading} onClick={() => createProfile()}>Create</button>
                    <button disabled={isLoading} onClick={() => navigate("/login")}>Exit</button>
                </div>

            </div>

        </div>
    )
}

export default CreateProfile
