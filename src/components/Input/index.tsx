import React, {ChangeEvent, createRef, useEffect, useRef, useState} from "react";
import Keyboard from "react-simple-keyboard";
import "./input.css";

const Input = ({title, id, type, placeholder, className, input, setInput}: { title: string, id: string, type: string, placeholder: string, className?: string, input: string, setInput: any }) => {
    const [visible, setVisible] = useState(false);

    const [layout, setLayout] = useState("default");
    let keyboard: any = useRef();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setInput(input)
        keyboard.current.setInput(input)
    }

    const onKeyPress = (button: string) => {
        console.log(button)
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "{enter}"){
            setVisible(false)
        }
    }

    const handleShift = () => {
        setLayout(layout === "default" ? "shift" : "default");
    }

    return (
        <div className={className}>
            <label className="form-label" htmlFor={id}>{title}</label>
            <input id={id} onChange={onChange} onFocus={() => setVisible(true)} onClick={() => setVisible(true)} className={"w-full px-4 py-3 mt-2"} value={input}
                   type={type} placeholder={placeholder}/>

            <div
                className={"bg-background-secondary absolute bottom-0 left-0 h-[442px] w-full px-3 pt-4 " + (type == "date" || !visible? "hidden" : "")}>
                <label className="form-label" htmlFor="keyboard-input">{title}</label>
                <div className={"flex mb-4 mt-2"}>
                    <input id={"keyboard-input"} onChange={onChange} value={input} className={"w-full bg-background-default px-4 py-3"}
                           placeholder={placeholder} type={type}/>
                </div>

                <Keyboard
                    keyboardRef={(r: any) => (keyboard.current = r)}
                    layoutName={layout}
                    onChange={(input) => setInput(input)}
                    onKeyPress={onKeyPress}
                />
            </div>
        </div>

    )
}

export default Input