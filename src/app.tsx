import router from "@/router";
import {RouterProvider} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {selectRFIDData} from "@/slices/rfid.slice";
import RfidNotification from "@/components/shared/RfidNotification";
import {selectDisplayStatus} from "@/slices/display.slice";

const App = () => {
  const rfid = useSelector(selectRFIDData);
  const isDisplayOn = useSelector(selectDisplayStatus);


  return (
    <div className={!isDisplayOn ? "no-pointer-events" : ""}>
      { rfid != null ? <RfidNotification /> : null }
      <RouterProvider router={router} />
    </div>
  )
}

export default App;