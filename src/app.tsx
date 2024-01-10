import router from "@/router";
import {RouterProvider} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {selectRFIDData} from "@/slices/rfidSlice";
import RfidNotification from "@/components/shared/RfidNotification";


const App = () => {
  const rfid = useSelector(selectRFIDData);


  return (
    <>
      { rfid != null ? <RfidNotification /> : null }
      <RouterProvider router={router} />
    </>
  )
}

export default App;