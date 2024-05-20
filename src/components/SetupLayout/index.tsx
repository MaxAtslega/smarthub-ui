import {Navigate, Outlet, useNavigate} from "react-router-dom";
import Navigator from "@/components/shared/Navigator";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/shared/Header";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/slices/user.slice";
import {selectDisplayStatus} from "@/slices/display.slice";
import {useGetConstantsByUserIdQuery} from "@/api/constants.api";
import Keyboard from "@/components/shared/Keyboard";

export default function SetupLayout() {
    const [keyboardVisibility, setKeyboardVisibility] = useState(false);

    return (
        <>
            <Header />
            <main
                className={`fixed top-[46px] left-0 w-full ${
                    keyboardVisibility ? "h-[293px]" : "h-[434px]"
                }`}
            >
                <div className={"h-full w-full overflow-x-hidden overflow-y-auto"}>
                    <div className={"mx-3 h-full"}>
                        <Outlet />
                    </div>
                </div>

                <Keyboard visibility={keyboardVisibility} setVisibility={setKeyboardVisibility}/>
            </main>
        </>
    );
}
