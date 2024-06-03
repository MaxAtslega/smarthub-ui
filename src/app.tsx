import router from "@/router";
import {RouterProvider} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectRFIDData} from "@/slices/rfid.slice";
import RfidNotification from "@/components/shared/RfidNotification";
import {selectDisplayStatus} from "@/slices/display.slice";
import {RootState} from "@/store";
import {decrementTimer, updateCurrentDate} from "@/slices/timer.slice";

const App = () => {
  const rfid = useSelector(selectRFIDData);
  const isDisplayOn = useSelector(selectDisplayStatus);
  const dispatch = useDispatch();
  const timer = useSelector((state: RootState) => state.timer.timer);
  const currentDate = useSelector((state: RootState) => state.timer.currentDate);
  const isActive = useSelector((state: RootState) => state.timer.isActive);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    const dateInterval = setInterval(() => {
      dispatch(updateCurrentDate());
    }, 30000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(dateInterval);
    };
  }, [dispatch]);


  return (
    <div className={!isDisplayOn ? "no-pointer-events" : ""}>
      { rfid != null ? <RfidNotification /> : null }
      <RouterProvider router={router} />
    </div>
  )
}

export default App;