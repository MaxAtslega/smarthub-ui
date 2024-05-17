import {webSocketService} from "@/services/webSocketService";
import {useRebootMutation, useShutdownMutation} from "@/api/system.api";
import React from "react";

function General() {
    const [shutdownSystem] = useShutdownMutation();
    const [rebootSystem] = useRebootMutation();

    return (
        <div>
            <h1>General</h1>

            <button className={"mt-4 mr-4"} onClick={async () => {
                await rebootSystem().unwrap();
            }}>REBOOT
            </button>

            <button className={"mt-4 mr-4"} onClick={async () => {
                await shutdownSystem().unwrap();
            }}>SHUTDOWN
            </button>
        </div>
    )
}

export default General
