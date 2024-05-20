import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useRoutes} from "react-router-dom";
import {useCreateUserMutation} from "@/api/users.api";
import "@/components/shared/Keyboard/keyboard-input.css";
import Keyboard from "@/components/shared/Keyboard";

function CreateProfile() {
    const [createUser, {isLoading, error}] = useCreateUserMutation();
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();
    const nameInput = useRef<HTMLInputElement | null>(null);
    const birthdayInput = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const intervalId = setInterval(() => setDate(new Date()), 1000 * 20);
        return () => clearInterval(intervalId);
    }, []);


    const createProfile = async () => {
        await createUser({
            user: {
                username: nameInput.current == null ? "" : nameInput.current.value,
                birthday: birthdayInput.current == null ? "" : birthdayInput.current.value,
                theme: 1,
                language: "en-US",
                keyboard: "english"
            }
        }).then((response) => {
            if ('data' in response) {
                navigate("/login")
            }
        });

    }

    return (
        <div>
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
                   ref={nameInput}
                   className={"mb-4 w-full px-4 py-3 mt-2"}
                   type={"text"} placeholder={"Your name"}/>

            <label className="form-label" htmlFor={"birthday"}>Birthday</label>
            <input id={"birthday"}
                   ref={birthdayInput}
                   className={"w-full px-4 py-3 mt-2"}
                   type={"date"}/>

            <div className={"flex gap-4 pt-4"}>
                <button disabled={isLoading} onClick={() => createProfile()}>Create</button>
                <button disabled={isLoading} onClick={() => navigate("/login")}>Exit</button>
            </div>

        </div>
    )
}

export default CreateProfile
