import {Navigate, Outlet, useNavigate} from "react-router-dom";
import Navigator from "@/components/shared/Navigator";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/shared/Header";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/slices/user.slice";
import {selectDisplayStatus} from "@/slices/display.slice";
import {useGetConstantsByUserIdQuery} from "@/api/constants.api";
import Keyboard from "@/components/shared/Keyboard";
import {AudioProvider} from "@/contexts/AudioPlayerContext";
import {SpotifyProvider} from "@/contexts/SpotifyContext";

export default function Default() {
    const currentUser = useSelector(selectCurrentUser);
    const [keyboardVisibility, setKeyboardVisibility] = useState(false);
    const isDisplayOn = useSelector(selectDisplayStatus);
    const { data: constants, error, isLoading } = useGetConstantsByUserIdQuery(currentUser?.id ?? 0, {
        skip: currentUser === null,
    });

    if (currentUser === null) {
        return <Navigate to="/login" />;
    }

    // Redirect if constants are empty
    if (!isLoading && constants && constants.length === 0) {
        return <Navigate to="/setup" />;
    }

    if (!isDisplayOn) {
        return <Navigate to="/splash" />;
    }

    if (isLoading) return <div></div>;
    if (error) return <Navigate replace to="/login" />;

    return (
        <SpotifyProvider>
            <AudioProvider>
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

                    <Keyboard visibility={keyboardVisibility} setVisibility={setKeyboardVisibility}/>

                    {!keyboardVisibility && <Navigator />}
                </main>
            </AudioProvider>
        </SpotifyProvider>
    );
}
