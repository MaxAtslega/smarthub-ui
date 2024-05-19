import { Navigate, Outlet } from "react-router-dom";
import Navigator from "@/components/shared/Navigator";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/shared/Header";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/slices/user.slice";
import Keyboard from "react-simple-keyboard";
import "./keyboard-input.css";
import {selectDisplayStatus} from "@/slices/display.slice";

export default function Layout() {
    const currentUser = useSelector(selectCurrentUser);
    const [layout, setLayout] = useState("default");
    const keyboard = useRef<any>(null);
    const [keyboardVisibility, setKeyboardVisibility] = useState(false);
    const [focusedInput, setFocusedInput] = useState<HTMLInputElement | null>(null);
    const [input, setInput] = useState("");
    const isDisplayOn = useSelector(selectDisplayStatus);

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
                console.log(target.classList)
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
                keyboard.current.setInput(focusedInput.value);
            }
        }
    }, [keyboardVisibility, focusedInput]);

    const onChange = (input: string) => {
        setInput(input);
        if (focusedInput) {
            focusedInput.value = input;
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

    if (currentUser == null) {
        return <Navigate replace to="/login" />;
    }

    if (!isDisplayOn) {
        return <Navigate replace to="/splash" />;
    }

    return (
        <>
            <Header />
            <main
                className={`fixed top-[46px] left-0 w-full ${
                    keyboardVisibility ? "h-[213px]" : "h-[360px]"
                }`}
            >
                <div className={"h-full w-full overflow-x-hidden overflow-y-auto"}>
                    <div className={"mx-3 h-full"}>
                        <Outlet />
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

                {!keyboardVisibility && <Navigator />}
            </main>
        </>
    );
}
