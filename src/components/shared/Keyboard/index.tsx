import React, {useEffect, useRef, useState} from "react";
import KeyboardComponent, {KeyboardLayoutObject} from "react-simple-keyboard";
import "./keyboard-input.css";
import KeyboardLayouts from "simple-keyboard-layouts/build";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/slices/user.slice";

const Keyboard = ({visibility, setVisibility}: {visibility: boolean, setVisibility: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const keyboard = useRef<any>(null);
    const [focusedInput, setFocusedInput] = useState<HTMLInputElement | null>(null);
    const [layout, setLayout] = useState("default");
    const currentUser = useSelector(selectCurrentUser);

    const keyboardLayout = new KeyboardLayouts().get(currentUser?.keyboard || "english");

    useEffect(() => {
        function clickHandler(e: MouseEvent) {
            const target = e.target as HTMLElement;
            if (target.nodeName === "INPUT" && (target as HTMLInputElement).type === "text") {
                setFocusedInput(target as HTMLInputElement);
                setVisibility(true);
            } else if (
                !target.classList.contains("hg-button") &&
                !target.classList.contains("hg-row") &&
                !target.classList.contains("hg-rows") &&
                !target.classList.contains("simple-keyboard")
            ) {
                setVisibility(false);
            }
        }

        window.addEventListener("click", clickHandler);
        return () => window.removeEventListener("click", clickHandler);
    }, []);

    useEffect(() => {
        if (visibility && focusedInput) {
            focusedInput.scrollIntoView({ behavior: "smooth", block: "center" });
            if (keyboard.current) {
                keyboard.current.setInput(focusedInput.value);
            }
        }
    }, [visibility, focusedInput]);

    const onChange = (input: string) => {
        if (focusedInput) {
            focusedInput.value = input;

            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value"
            )?.set;
            if (nativeInputValueSetter) {
                nativeInputValueSetter.call(focusedInput, input);
            }

            const event = new Event("input", { bubbles: true });
            focusedInput.dispatchEvent(event);
        }
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKeyPress = (button: string) => {
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "{enter}") setVisibility(false);
    };

    return (
        <>
            {visibility && (
                <KeyboardComponent
                    keyboardRef={(r) => (keyboard.current = r)}
                    layoutName={layout}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    layout={keyboardLayout.layout as KeyboardLayoutObject}
                />
            )}
        </>
    )
}

export default Keyboard