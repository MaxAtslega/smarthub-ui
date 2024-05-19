import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useRoutes} from "react-router-dom";
import {useCreateUserMutation} from "@/api/users.api";
import Keyboard from "react-simple-keyboard";
import "@/components/Layout/keyboard-input.css";


function CreateProfile() {
    const [createUser, {isLoading, error}] = useCreateUserMutation();
    const [date, setDate] = useState(new Date());
    const [nameInput, setNameInput] = useState("");
    const [birthdayInput, setBirthdayInput] = useState("");
    const navigate = useNavigate();

    const [layout, setLayout] = useState("default");
    const keyboard = useRef<any>(null);
    const [keyboardVisibility, setKeyboardVisibility] = useState(false);
    const [focusedInput, setFocusedInput] = useState<HTMLInputElement | null>(null);

    useEffect(() => {
        const intervalId = setInterval(() => setDate(new Date()), 1000 * 20);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        function clickHandler(e: MouseEvent) {
            const target = e.target as HTMLElement;
            if (target.nodeName === "INPUT" && (target as HTMLInputElement).type === "text") {
                setFocusedInput(target as HTMLInputElement);
                setKeyboardVisibility(true);
            } else if (
                !target.classList.contains("hg-button") &&
                !target.classList.contains("hg-row") &&
                !target.classList.contains("hg-rows") &&
                !target.classList.contains("simple-keyboard")
            ) {
                setKeyboardVisibility(false);
            }
        }

        window.addEventListener("click", clickHandler);
        return () => window.removeEventListener("click", clickHandler);
    }, []);

    useEffect(() => {
        if (keyboardVisibility && focusedInput) {
            focusedInput.scrollIntoView({ behavior: "smooth", block: "center" });
            if (keyboard.current) {
                keyboard.current.input.default = focusedInput.value;
                keyboard.current.setInput(focusedInput.value);

                console.log(keyboard.current.input)
            }
        }
    }, [keyboardVisibility, focusedInput]);

    const onChange = (input: string) => {
        if (focusedInput) {
            focusedInput.value = input;

            if (focusedInput.id === "name") {
                setNameInput(input);
            } else if (focusedInput.id === "birthday") {
                setBirthdayInput(input);
            }
        }
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKeyPress = (button: string) => {
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "{enter}") setKeyboardVisibility(false);
    };

    const createProfile = async () => {
        const response = await createUser({
            user: {
                username: nameInput,
                birthday: birthdayInput,
                theme: 1,
                language: "en",
            }
        }).then((response) => {
            if ('data' in response) {
                navigate("/login")
            }
        });

    }

    return (
        <div>
            <div className={`flex flex-col relative ${
                keyboardVisibility ? "h-[260px]" : "h-[480px]"
            }`}>
                <div className={"h-[38px] w-full px-3 mb-1 pt-1"}>
                    <div className={"flex justify-between items-center h-[100%]"}>
                    <span className={"flex font-bold text-xs content-center flex-wrap"}>
                        {date.getHours()}:{date.getMinutes()}
                    </span>
                    </div>
                </div>

                <div className={"h-full px-4 overflow-auto"}>
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

            {keyboardVisibility && (
                <Keyboard
                    keyboardRef={(r) => (keyboard.current = r)}
                    layoutName={layout}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />
            )}
        </div>
    )
}

export default CreateProfile
