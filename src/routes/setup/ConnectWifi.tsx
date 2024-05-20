import Wifi from "@/models/Wifi";
import isPasswordProtected from "@/utils/isPasswordProtected";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {webSocketService} from "@/services/webSocketService";

const ConnectWifi = () => {
    const navigate = useNavigate();
    const location = useLocation();

    if (location.state.wifi == null){
        navigate("/login");
        return <></>
    }

    if (!isPasswordProtected(location.state.wifi.capability)){
        webSocketService.sendMessage(JSON.stringify({
            t: "CONNECT",
            op: 3,
            d: {
                "ssid": location.state.wifi.ssid,
                "password": ""
            }
        }));

        navigate(-1);

        return <></>
    }

    return <div>
           <h1>{location.state.wifi.ssid}</h1>
        </div>

}

export default ConnectWifi